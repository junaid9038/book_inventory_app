

function deleteProduct(id){
    const result =confirm('Are you sure you wnat to delete this product?')

    if(result){
        fetch('/delete-product/'+id,{
            method:'post',
        }).then((res)=>{
            if(res.ok){
                location.reload();
            }
        })
    }
}