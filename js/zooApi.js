$(function () {
    var Location = []; //動物園管區
    var nowClick = "";
    var animalData = []; //需要的資料{A_Behavior,A_Diet,A_Distribution,A_Feature,A_Name_Ch,A_Name_En,A_Pic01_URL}
    $.ajax({
        url: 'https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a3e2b221-75e0-45c1-8f97-75acbd43d613',
        // data: $('#form1').serialize(), //表單serialize序列化
        type: 'GET',
        dataType: 'json',
        success: function (all) {

            console.log(all.result.results);
            var data = all.result.results;
            data.forEach(e => {
                addData(e)
            });
            addObj(data)
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
            if (e.A_Location != "" && e.A_Location.indexOf(";") < 0) {
                //如果沒在陣列中就疊加進Location
                Location.push(e.A_Location);
                $("#Category").append('<li href="#" class="list-group-item">' + e.A_Location + '</li>');
            }

        }
    }
    $("#Category").on('click', '.list-group-item', function () {
        nowClick = $(this).text();
        console.log($(this).text());
        getData(nowClick);
    })
    //{A_Behavior,A_Diet,A_Distribution,A_Feature,A_Name_Ch,A_Name_En,A_Pic01_URL}
    function addObj(getData) {
        Location.forEach(item => {
            // var OneCityValue = getData.filter(e => e.item == item);
            var itemCount = {};
            itemCount.Name = item;
            itemCount.occTotal = 0;
            animalData.push(itemCount);
        })
        console.log(cityData);
    }

})