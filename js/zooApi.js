$(function () {
    var Location = []; //動物園管區
    var nowClick = "";
    var animalData = []; //需要的資料{A_Behavior,A_Diet,A_Distribution,A_Feature,A_Name_Ch,A_Name_En,A_Pic01_URL,video}
    var count = 0;
    $.ajax({
        url: 'https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a3e2b221-75e0-45c1-8f97-75acbd43d613',
        // data: $('#form1').serialize(), //表單serialize序列化
        type: 'GET',
        dataType: 'json',
        success: function (all) {
            console.log(all.result.results);
            var data = all.result.results;
            data.forEach(e => {
                addData(e);
            });
            //addObj(data);
            console.log(Location);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    function addData(e) {

        if (Location.find(item => item == e.A_Location)) {
        } else {

            if (e.A_Location != "" && e.A_Location != null && e.A_Location.indexOf(";") < 0) {
                //如果沒在陣列中就疊加進Location
                Location.push(e.A_Location);
                $("#Category").append('<li href="#" class="list-group-item" tab=' + count + '>' + e.A_Location + '</li>');
                count += 1;
           }
        }
    }

    function addObj(getData) {
        Location.forEach(item => {
            var OneLocationValue = getData.filter(e => e.A_Location.indexOf(item) != -1);
            var animal = []
            OneLocationValue.forEach(i => {
                var itemCount = {};
                itemCount.Location = i.A_Location;
                itemCount.CName = i.A_Name_Ch;
                itemCount.EName = i.A_Name_En;
                itemCount.PicUrl = i.A_Pic01_URL;
                itemCount.PicUrl2 = i.A_Pic02_URL;
                itemCount.Behavior = i.A_Behavior;
                itemCount.Diet = i.A_Diet;
                itemCount.Feature = i.A_Feature;
                itemCount.Distribution = i.A_Distribution;
                itemCount.video = i.A_Vedio_URL;
                animal.push(itemCount);
            })
            animalData.push(animal);
        })
        console.log(animalData);
    }
    //點下的是哪一個館
    $("#Category").on('click', '.list-group-item', function () {
        $("#animal").empty();
        nowClick = $(this).text();      
        console.log($(this).text());
        //目前是第幾個li
        var index = $(".list-group-item").index(this);
        $(".list-group-item").css({"background-color":"white","color":"#000000"});
        $(this).css({"background-color":"#E6B0AA","color":"white"});
        console.log(animalData[index]); 
        $("#animal").append('<div class="col-lg-12 col-md-12 mb-12"><p class="title">'+nowClick+'</p></div>');       
        animalData[index].forEach(i => {
            $("#animal").append('<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><img class="card-img-top" src=' + i.PicUrl + ' alt=""><div class="card-body">'
                + '<h4 class="card-title"><a href='+i.PicUrl2+' target="_blank">' + i.CName + '</a></h4><h5>' + i.EName + '</h5><p class="card-text">生活地區:' + i.Distribution + '</p><p class="card-text">外觀:' + i.Feature + '</p><p class="card-text">食物:'+i.Diet+'</p><p class="card-text">習性:' + i.Behavior + '</p></div>'
                + '<div class="card-footer"><small class="text-muted">觀看影片<a href=' + i.video + '>'+ i.video +'</a></small></div></div></div>');
        })
    })
})