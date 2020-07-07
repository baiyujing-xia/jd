<?php
    include('./conn.php');

    $currentPage = $_REQUEST['page']; // 当前页数
    $pageSize = 20; // 每一页的长度
    $stratRow = ($currentPage-1)*$pageSize;

    $sql = "select * from jdgoods limit $stratRow,$pageSize";

    $res = $mysqli->query($sql);

    $arr = array();

    while($row = $res->fetch_assoc()){
        array_push($arr,$row);
    }

    $json = json_encode($arr);

    echo $json;

    $mysqli->close();

?>