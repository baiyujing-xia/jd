<?php
    include('./conn.php');

    for($i=1;$i<300;$i++){

        $sql = "INSERT INTO `product`(`title`, `price`, `num`, `pic`, `details`) VALUES ('test$i','111',20,'./images/$i.jpg','tttttttt')";
        $mysqli->query($sql);
    }

    $mysqli->close();
?>