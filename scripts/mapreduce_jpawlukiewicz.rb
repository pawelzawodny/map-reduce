# encoding: UTF-8
require 'mongo'
require 'uri'
include Mongo

def get_pie_chart_url(tab,x_label,y_label, title = "", sum = 0)
  chd = []
  chdl =[]
  tab.count.times{|i|
    chd << (((tab[i][x_label]).to_f/sum.to_f)*100).round(2)
    chdl << tab[i][y_label]
  }
  chart_params = {
    chs: "600x#{tab.count*25}",
    cht: "p3",
    chd: "t:#{chd.join(",")}",
    chl: chd.join("%|") + "%",
    chdl: chdl.join("|"),
    chtt: title
  }
  "#{GOOGLE_CHARTS_URL}?#{URI.encode_www_form(chart_params)}"
end

def get_chart_url(tab,x_label,y_label, title = "")
  max_value = tab.first[x_label]
  tab.count.times{|i|
  	if tab[i][x_label] > max_value
  	  max_value = tab[i][x_label] 	
  	end
  }
  ratio = 100.to_f/max_value.to_f
  chd = []
  chxl =[]
  tab.count.times{|i|
    chd << (tab[i][x_label].to_f).round(2) * ratio
    chxl << tab[i][y_label]
  }
  chart_params = {
    chs: "600x#{tab.count*38}",
    cht: "bhg",
    chxt: "x,y",
    chxr: "0,0,#{max_value}",
    chg: "#{ratio},20,1,5",
    chd: "t:#{chd.join(",")}",
    chxl: "1:|#{chxl.reverse.join("|")}",
    chtt: title
  }
  "#{GOOGLE_CHARTS_URL}?#{URI.encode_www_form(chart_params)}"
end

GOOGLE_CHARTS_URL = "http://chart.apis.google.com/chart"

host = 'localhost'
port = 27017
db = 'test'
collection = 'car_market'

sigma = MongoClient.new(host, port, w: 1, wtimeout: 200, j: true).db(db)
car_market = sigma.collection(collection)

p "Procentowy udzial marek na rynku"

map = %Q{
  function() {
    emit(this.make, 1);
  };
}

reduce = %Q{
  function(key, values) {
	return Array.sum(values);
  };
}

results = car_market.map_reduce(map, reduce, {:out => {inline: true}, :raw => true})["results"].sort{|a,b| a["value"] > b["value"] ? -1 : 1}

sum = 0
sum_other = 0
results.count.times{|i|
  sum += results[i]["value"]
  sum_other += results[i]["value"] if i >= 7
}

results = results.take(7).push({"_id" => "Other", "value" => sum_other});

puts get_pie_chart_url(results,'value','_id', 'Procent udziału marek na rynku', sum)


p "Najdroższe marki"

map2 = %Q{
  function() {
    emit(this.make, this.price);
  };
}

reduce2 = %Q{
  function(key, values) {
	return Array.sum(values)/values.length;
  };
}

results2 = car_market.map_reduce(map2, reduce2, {:out => {inline: true}, :raw => true})["results"].sort{|a,b| a["value"] > b["value"] ? -1 : 1}.take(10)

puts get_chart_url(results2,'value','_id', 'Najdroższe marki')