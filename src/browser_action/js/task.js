 var uid = "";
 var apit = "";

chrome.storage.sync.get('apit', function (data) {
    apit = data.apit;
});
chrome.storage.sync.get('uid', function (data) {
    uid = data.uid;
});
$('#config, #titconf').css("visibility", "visible");

$(document).ready(function () {
    chrome.storage.sync.get('apit', function (data) {
        if ((data.apit == "") || (data.apit == null) || (data.apit == "undefined")) {
            $('#config, #titconf').show();
            $('#form, #button').hide();

        } else {

            $('input#apit').val(data.apit);
            var uid = data.apit;

            $('#config, #titconf').hide();
            $('#form, #button').show();
        }
    });
    chrome.storage.sync.get('uid', function (data) {
        if ((data.uid == "") || (data.uid == null) || (data.uid == "undefined")) {
            $('#config, #titconf').show();
            $('#form, #button').hide();

        } else {

            $('input#userid').val(data.uid);
            $('#config, #titconf').hide();
            $('#form, #button').show();
        }
    });

    $('#show-config').click(function () {
        $('#config, #titconf').show();
        $('#form, #button').hide();
    });

    $('.reload').click(function () {
        location.reload();
    });
    $("#save").click(function () {
        var apitoken = $('#apit').val();
        var userid = $('#userid').val();
        chrome.storage.sync.set({
            apit: apitoken
        });
        chrome.storage.sync.set({
            uid: userid
        });
        location.reload();
    });

    $("#button").click(function () {
        var task = $('#task').val();
        var notes = $('#notes').val();
        var priority = $('input[name="priority"]:checked').val();



        $.ajax({
            url: 'https://habitica.com/api/v3/tasks/user',
            type: 'POST',
            data: "type=todo&text=" + task + "&notes=" + notes + "&priority=" + priority,
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('x-api-user', uid);
                xhr.setRequestHeader('x-api-key',  apit);
                xhr.setRequestHeader('x-client', '07081834-08a7-4997-947d-ded854a2afda-addtask');
            },
            success: function yeah(data) {
                $('#success').show();
                $('#form').hide();
                // $("body").append(JSON.stringify(data));
                //$("body").append(data["responseJSON"]["success"]);

            },
            error: function error(data) {
            /*
                {"readyState":4,"responseText":"{\"success\":false,\"error\":\"NotAuthorized\",\"message\":\"No hay ninguna cuenta con esas credenciales.\"}","responseJSON":{"success":false,"error":"NotAuthorized","message":"No hay ninguna cuenta con esas credenciales."},"status":401,"statusText":"error"}
                        */
                $("body").append(data["responseText"]);
                $('#form').hide();
                $('#error').show();
        
            },
        });
    });

});
