$.ajax({
    url: 'https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a3e2b221-75e0-45c1-8f97-75acbd43d613',
    // data: $('#form1').serialize(), //表單serialize序列化
    type: 'GET',
    dataType: 'json',
    success: function (all) {
        var title = ""
        alert("抓到囉");
        console.log(all.result.results);
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
    }
});