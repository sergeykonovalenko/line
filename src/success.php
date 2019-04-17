<?php
header("Content-Type: text/html; charset=utf-8");
$fld_type = htmlspecialchars($_POST["fld-type"]);
$service = htmlspecialchars($_POST["service"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["phone"]);
$email = htmlspecialchars($_POST["email"]);
$date=date("d.m.y");
$time=date("H:i");
$myemail = "sergeykonovalenko5550199@gmail.com";
$tema = "Новый заказ";
$message_to_myemail;

if ($fld_type == 'type 1') {

    $message_to_myemail = "Уважаемый администратор, Вам поступил новый заказ
    <br><br>
    <b>Телефон:</b> $tel<br>
    <b>Имя:</b> $name<br>
    <b>Дата:</b> $date<br>
    <b>Время:</b> $time<br>
    ";
}

if ($fld_type == 'type 2') {

    $message_to_myemail = "Уважаемый администратор, Вам поступил новый заказ
    <br><br>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $tel<br>
    <b>E-mail:</b> $email<br>
    <b>Дата:</b> $date<br>
    <b>Время:</b> $time<br>
    ";
}

if ($fld_type == 'type 3') {

    $message_to_myemail = "Уважаемый администратор, Вам поступил новый заказ
    <br><br>
    <b>Услуга:</b> $service<br>
    <b>Имя:</b> $name<br>
    <b>Телефон:</b> $tel<br>
    <b>E-mail:</b> $email<br>
    <b>Дата:</b> $date<br>
    <b>Время:</b> $time<br>
    ";
}

mail($myemail, $tema, $message_to_myemail, "From: info@$SERVER_NAME \r\n Reply-To: Линия \r\n" . "MIME-Version: 1.0\r\n" . "Content-type: text/html; charset=utf-8\r\n" );
