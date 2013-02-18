<?php
/*
 * Copyright (c) 2013 Baptiste Lepers
 * Released under MIT License
 *
 * Feedback - Entry point
 */

class Pages_Feedback_Index {
   public static $description = "Feedback Plugin";
   public static $isOptional = true;
   public static $showOnMenu = false;

   public static function setupAutoload() {
      AutoLoader::$autoload_path[] = "./pages/feedback/php/";
   }

   static public function getOptions() {
      return array(
         array('id' => 'feedback_mail', 'type' => 'text', 'cat' => 'Feedback Plugin', 'default' => ''),
      );
   }

   static public function getUserScripts() {
      return array('./admin/pages/feedback/scripts/jgallery.feedback.js');
   }

   static public function mainAction() {
   }
};



