<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('../../../config.php');

if(!isset($GLOBALS['feedback_mail'])) {
   header('HTTP/1.0 403 Forbidden');
   die('Email not set in the options');
}

session_start();

$captcha_validated = isset($_SESSION['captcha_validated']) && $_SESSION['captcha_validated'] === true;


function send_mail() {
   global $feedback_mail;
   $data = json_decode($_POST['data'], true);

   $issue = htmlspecialchars($data[0]['Issue']);
   $image = (isset($data[1])&&$data[1]!==null&&$data[1]!=='null')?htmlspecialchars($data[1]):'';


   $to  = $feedback_mail;

   $subject = '[Envadrouille] feedback';

   $message = '<html><head></head><body>Issue : '.$issue.'<br/><img src="'.$image.'" /></body></html>';

   $headers  = 'MIME-Version: 1.0' . "\r\n";
   $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

   $_SESSION['captcha_validated'] = false;
   $_SESSION['random_number'] = rand();
   mail($to, $subject, $message, $headers);
}

function check_captcha() {
   if(!isset($_SESSION['random_number'])) {
      $_SESSION['captcha_validated'] = false;
   } else if(strtolower($_POST['code']) == strtolower($_SESSION['random_number'])) {
      $_SESSION['captcha_validated'] = true;
   } else {
      $_SESSION['captcha_validated'] = false;
   }
   return json_encode(array('valid' => $_SESSION['captcha_validated']));
}


if(isset($_POST['data'])) {
   if($captcha_validated) {
      send_mail();
   } else {
      header('HTTP/1.0 403 Forbidden');
      die('Invalid captcha');
   }
} else if(isset($_POST['code'])) {
   echo check_captcha();
}

session_write_close(); 

?>
