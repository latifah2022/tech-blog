console.log("post js is working")
async function newFormHandler(event) {
    event.preventDefault();
   console.log("creating postss");
    // Get the post title and post text from the form
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('textarea[name="content"]').value;

    const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({
           title,
           description
    }),
        headers: {
           'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    }   else {
        alert(response.statusText);
    }
}

async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
        ];

    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      });

    if (response.ok) {
        document.location.replace('/');
        // otherwise, display the error
      } else {
        alert(response.statusText);
      }
}
  
document.querySelector('.btn-2').addEventListener('click', deleteFormHandler);

document.querySelector('.btn-3').addEventListener('click', editFormHandler);
  // Event Listener for the new post submit button
  document.querySelector('.btn-1').addEventListener('click', newFormHandler);