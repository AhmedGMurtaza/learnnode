$(document).ready(function(){
    $('.delete-article').on('click',function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        console.log(id)
        $.ajax({
            type:'DELETE',
            url:'/articles/'+id,
            success:function(res){
                alert('success')
                window.location.href='/';
            },
            error:function(err){
                console.log('error')
                console.log(err);
            }
        })
    })
})