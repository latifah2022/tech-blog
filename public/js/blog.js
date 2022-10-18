async function editFormHandler(event) {
    event.preventDefault();

    const blogId = event.target.getAttribute("data-id")
     console.log(blogId)

   const userComment = document.querySelector(`#blog-comment`).value;
   console.log(userComment)

    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
  
    const response = await fetch(`/api/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify(),
      userComment,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
       //document.location.replace(`/blog/${id}`);
    } else {
      alert("can't add comment");
    }
  }

  const delButtonHandler = async (event) => {
    console.log('deleting comement')
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  document.querySelector('.btn-2').addEventListener('click', delButtonHandler);

  
  document.querySelector('.btn-1').addEventListener('click', editFormHandler);