// jquery for loading new pages without refreshing
$(document).ready(function(){
    // Make sidebar the trigger
    var trigger = $('#sidebar a'),
    //  Add page in place of content
        container = $('#content');

    trigger.on('click', function(){
      var $this = $(this),
        target = $this.data('target');

      // Load target page into container
      container.load(target + '.html');

      // Remove any "active" class
      $('#sidebar a').removeClass();
      // Change the clicked nav button to active
      $("#" + this.id).addClass('active');

      return false;
    });
  });
