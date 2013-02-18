/*
 * jgallery.feedback.js
 * Copyright (c) 2013 Baptiste Lepers
 * Released under MIT License
 */
var JFeedback = {
   changeLang:function(action) {
      if(jGallery.lang == 'fr') {
         config.tr['Send feedback'] = 'Envoyer un commentaire';
         config.tr['Loading the feedback plugin...'] = 'Chargement du plugin...';
         config.tr['Continue'] = 'Continuer';
         config.tr['Send'] = 'Envoyer';
         config.tr['Your feedback was sent succesfully. Thanks!'] = 'Votre commentaire a été envoyé. Merci !';
         config.tr['There was an error sending your feedback to the server.'] = 'Une erreur s\'est produite.';
         config.tr['Feedback (include your email if you want a response)'] = 'Commentaire (incluez votre email si vous voulez une réponse) ';
         config.tr['Highlight or blackout important information'] = 'Mettez en avant certains éléments';
         config.tr['Invalid captcha'] = 'Captcha invalide';
         config.tr['Sending feedback... This might take a few minutes.'] = 'Envoi du commentaire... Cette opération peut prendre quelques minutes.';
         config.tr['Continue without sending screenshot'] = 'Continuer sans envoyer de capture';
      }
   },

   loaded:false,

   want:function(action) {
      return false;
   },

   addCss:function(url, cb) {
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.id = 'feedback';
      link.href = url;

      document.getElementsByTagName('head')[0].appendChild(link);

      var img = document.createElement('img');
      img.onerror = function(){
         cb();
      }
      img.src = url;
   },

   show:function(click) {
      $('.feedback-btn').remove();
      Feedback({
         h2cPath:'scripts/html2canvas.js',
         url:'./admin/pages/feedback/php/sendfeedback.php',
         captcha:'./admin/pages/feedback/php/get_captcha.php',
         refresh:'./admin/pages/feedback/css/refresh.jpg',
      });
      if(click)
         $('.feedback-btn').click();
   },

   loadFeedback:function(progresscb, endcb) {
      var done = 0;
      function loaded() {
         done++;
         progresscb(done, 3);
         if(done == 3) {
            JFeedback.loaded = true;
            endcb();
            JFeedback.show(true);
         }
      }
      progresscb(done, 3);
      JFeedback.addCss('./admin/pages/feedback/css/feedback.css', loaded);
      $script('./admin/pages/feedback/scripts/html2canvas.js', 'html2canvas', loaded);
      $script('./admin/pages/feedback/scripts/feedback.min.js', 'feedback', loaded);
   },

   init:function() {
      var langcb = $('<div class="customtranslate"/>').bind('languagechangeevt', function() {
         JFeedback.changeLang();
         if(JFeedback.loaded)
            JFeedback.show(false);
      });
      JFeedback.changeLang();

      var button = $('<div class="translate" style="bottom: 5px; left: 5px; position: fixed; display: inline-block; padding: 4px 10px 4px; margin-bottom: 0; font-size: 13px; line-height: 18px; color: #333333; text-align: center; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle; background-color: #f5f5f5; background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6); background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6); background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6)); background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6); background-image: -o-linear-gradient(top, #ffffff, #e6e6e6); background-image: linear-gradient(top, #ffffff, #e6e6e6); background-repeat: repeat-x; filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffff\', endColorstr=\'#e6e6e6\', GradientType=0); border-color: #e6e6e6 #e6e6e6 #bfbfbf; border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); filter: progid:DXImageTransform.Microsoft.gradient(enabled = false); border: 1px solid #ccc; border-bottom-color: #bbb; border-radius: 4px; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); cursor: pointer; filter: progid:DXImageTransform.Microsoft.gradient(enabled = false); *margin-left: .3em;">'+jGalleryModel.translate('Send feedback')+'</div>');
      button.click(function() {
         JFeedback.loadFeedback(
            function(done, total) { button.text(jGalleryModel.translate('Loading the feedback plugin...')+'('+done+'/'+total+')'); },
            function() { button.remove(); }
         );
      });


      $('body').append(button);
      $('body').append(langcb);
   }
};
config.pluginsInstances.push(JFeedback);

