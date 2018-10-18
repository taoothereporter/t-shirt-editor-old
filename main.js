var items = [
    {
        title: 'Item 1',
        models: [
            {
                title:'Model 1',
                colors:[
                    {
                        title:'Color 1'
                    }
                ]
            },
            {
                title:'Model 2',
                colors:[
                    {
                        title:'Color 1'
                    },
                    {
                        title:'Color 2'
                    }
                ]
            }

        ]
    },

    {
        title: 'Item 2',
        models: [
            {
                title:'Model 3',
                colors:[
                    {
                        title:'Color 1'
                    }
                ]
            },
            {
                title:'Model 4',
                colors:[
                    {
                        title:'Color 1'
                    },
                    {
                        title:'Color 2'
                    }
                ]
            }

        ]
    }


];

var itemOpts;
$.each(items, function(i,item){
    itemOpts += '<option>'+item.title+'</option>';
});

var currentItem;

$('#selectMenu1').html(itemOpts);

$('#selectMenu1').on('change', function () {
    var name = $(this).val()[0];
    $.each(items, function(i, item){
        if (item.title === name) {
            var content; 
            $.each(item.models, function(j, subitem){
                content += '<option>'+subitem.title+'</option>';
            });
            $('#selectMenu2').html(content);       
            currentItem = item;     
        }
    });
});

$('#selectMenu2').on('change', function () {
    var name = $(this).val()[0];
    $.each(currentItem.models, function(i, item){
        if (item.title === name) {
            var content;
            $.each(item.colors, function(j, subitem){
                content += '<option>'+subitem.title+'</option>';
            });
            $('#selectMenu3').html(content);
        }
    });
});

$('#deleteItem').on('click', function() {
    $('#selectMenu1').find(':selected').remove();
});

$('#addItem').on('click', function() {
    $('.addItemDialog').addClass('is-active');
});

$('#cancelItemDialog').on('click', function() {
    $('.addItemDialog').removeClass('is-active');
});

$('#closeItemDialog').on('click', function() {
    $('.addItemDialog').removeClass('is-active');
});

$('#saveItemDialog').on('click', function() {

    var newItem = {
        title: $('#titleItem').val(),
        gender: $('#genderItem').val(),
        size: $('#sizeItem').val(),
        age: $('#ageItem').val(),
        description: $('#descriptionItem').val(),
        file: $('#fileItem').val()
    };

    $('.addItemDialog').removeClass('is-active');    
});

$('#addModel').on('click', function() {
    $('.addModelDialog').addClass('is-active');
});

$('#cancelModelDialog').on('click', function() {
    $('.addModelDialog').removeClass('is-active');
});

$('#closeModelDialog').on('click', function() {
    $('.addModelDialog').removeClass('is-active');
});

$('#saveModelDialog').on('click', function() {

    var newItem = {
        title: $('#titleModel').val(),
        printPlain: $('#plainPrint').val(),
        printSublim: $('#sublimPrint').val(),
        description: $('#descriptionItem').val(),
        file: $('#fileItem').val()
    };

    $('.addModelDialog').removeClass('is-active');    
});


$('#addColor').on('click', function() {
    $('.addColorDialog').addClass('is-active');
});

$('#cancelColorDialog').on('click', function() {
    $('.addColorDialog').removeClass('is-active');
});

$('#closeColorDialog').on('click', function() {
    $('.addColorDialog').removeClass('is-active');
});

$('#saveColorDialog').on('click', function() {

    var newItem = {
        title: $('#titleColor').val(),
        description: $('#descriptionColor').val(),
        file: $('#fileColor').val()
    };

    $('.addColorDialog').removeClass('is-active');    
});



$('#addSide').on('click', function() {
    $('.addSideDialog').addClass('is-active');
});

$('#cancelSideDialog').on('click', function() {
    $('.addSideDialog').removeClass('is-active');
});

$('#closeSideDialog').on('click', function() {
    $('.addSideDialog').removeClass('is-active');
});

$('#saveSideDialog').on('click', function() {

    var newItem = {
        title: $('#titleSide').val(),
        description: $('#descriptionSide').val(),
        file: $('#fileSide').val()
    };

    $('.addSideDialog').removeClass('is-active');    
});
