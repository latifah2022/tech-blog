async function editFormHandler(event) {
    event.preventDefault();

    const blogId = event.target.id
     console.log(blogId)

   const userComment = document.querySelector('#blog-comment').value;
    
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
      document.location.replace(`/blog/${id}`);
    } else {
      alert("can't add comment");
    }
  }
  
  document.querySelector('.submit-btn').addEventListener('click', editFormHandler);