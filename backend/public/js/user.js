$(document).ready(function(){





    $('.datTable').DataTable();

}) ;

function  deleteUser  (userId){

    $.post( "/adminpanel/usermanager/delete", { user: userId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}
function  deleteMuscle  (muscleId){

    $.post( "/adminpanel/catalog/muscles/delete", { muscle: muscleId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}
function  deleteEquipment  (equipmentId){

    $.post( "/adminpanel/catalog/equipment/delete", { equipment: equipmentId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}


function  deleteDifficulty  (difficultyId){

    $.post( "/adminpanel/catalog/difficulty/delete", { difficulty: difficultyId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}

function  deleteTag   (tagId){

    $.post( "/adminpanel/catalog/tags/delete", { tagId: tagId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}



function  deleteExercise   (exerciseId){

    $.post( "/adminpanel/content/exercises/delete", { exerciseId: exerciseId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}

function  deleteWorkout   (workoutId){

    $.post( "/adminpanel/content/workouts/delete", { workoutId: workoutId })
        .done(function( data ) {
            if(data.error==true){
                alert(data.msg);
            }else{
                location.reload();
            }
        });
}