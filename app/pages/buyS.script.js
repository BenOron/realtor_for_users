
$(document).ready(function(){
    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        console.log(files)
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }
  
$('.datepicker').datepicker('show');
 $('.next').click(function(){

  var nextId = $(this).parents('.tab-pane').next().attr("id");
  $('ul li a[href="#'+nextId+'"]').tab('show');
  return false;
  
})

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  
  //update progress
  var step = $(e.target).data('step');
  var percent = (parseInt(step) / 5) * 100;
  
  $('.progress-bar').css({width: percent + '%'});
  $('.progress-bar').text("שלב " + step + " מתוך 5");
  
  //e.relatedTarget // previous tab
  
})

$('.first').click(function(){

  $('#myWizard a:first').tab('show')

})

$('select').on('change', function()
{
    $(".modal-body > div :eq(1) ").parent().removeClass("hideElements");
  if($("#sel1")[0].value === "עסקה חדשה"){
    $(".modal-body > div").removeClass("hideElements");     
  }else{
  $(".modal-body > div").addClass("hideElements");
   $(".modal-body > div :eq(1) ").parent().removeClass("hideElements");
  }
});


$(".modal-body > div").addClass("hideElements"); 
$(".modal-body > div :eq(1) ").parent().removeClass("hideElements");
if($("#sel1")[0].value === "עסקה חדשה"){
$(".modal-body > div").removeClass("hideElements");     
}

});


var room = 1;
function education_fields() {
 
    room++;
    var objTo = document.getElementById('education_fields')
    var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-group removeclass"+room);
	var rdiv = 'removeclass'+room;
    divtest.innerHTML = '<div class="form-group col-md-6"><input type="text" class="form-control" id="schom" name="schom" value="" placeholder="סכום:"> </div>      <div class="checkbox col-md-4"><label><input type="checkbox" value="">כנגד מכתב כוונות</label></div><div class="input-group-btn"> <button class="btn btn-danger" type="button" onclick="remove_education_fields('+ room +');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button></div></div></div></div><div class="clear"></div></div>';
    
    objTo.appendChild(divtest)
}
   function remove_education_fields(rid) {
	   $('.removeclass'+rid).remove();
   }
   
   
   
  
