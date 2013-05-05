<?
$m = new Mongo();
$db = $m->selectDB('test');
// dla każdego województwa wylicza ilość kodów pocztowych
$map = new MongoCode("function() { emit(this.wojewodztwo,1); }");
$reduce = new MongoCode("function(k, val) { var count = 0;
 for(i in val){
 count += val[i]; }
 return count; }");
$mapreduce = $db->command(array(
	'mapreduce' => 'kodypocztowe',
	'map' => $map,
	'reduce' => $reduce,
	'out' => 'result'));

$result = $db->selectCollection($mapreduce['result'])->find();
foreach($result as $one) {
	var_dump($one);
}