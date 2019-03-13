var database = firebase.database();



$("#submitBttn").on("click", function(){

    event.preventDefault();

    var nameI = $("#nameInput").val().trim();
    var destI = $("#destInput").val().trim();
    var freqI = $("#freqInput").val().trim();
    var dateI =  $("#dateInput").val().trim();

    var schdl = {
    name: nameI,
    dest: destI,
    date: dateI,
    freq: freqI
              };

    database.ref().push(schdl);


});



database.ref().on("child_added", function(snapshot){

    var nameI = snapshot.val().name;
    var destI = snapshot.val().dest;
    var dateI = snapshot.val().date;
    var freqI = snapshot.val().freq;


    var origin = moment(dateI, "HH:mm").subtract(1, "years");
    var differential = moment().diff(moment(origin), "minutes");
    var mod = differential % freqI;
    var remainder = freqI - mod;
    var next = moment().add(remainder, "minutes");


    var tr = $("<tr>");
    var td = $("<td>");
    var td2 = $("<td>");
    var td3 = $("<td>");
    var td4 = $("<td>");
    var td5 = $("<td>");

    td.text(nameI);
    td2.text(destI);
    td3.text(freqI);
    td4.text(next);
    td5.text(remainder);


    tr.append(td);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    $("#tBody").append(tr);
});