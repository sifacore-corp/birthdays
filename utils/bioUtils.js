import Router from 'next/router';

export async function publishBio(id) {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

export async function unPublishBio(id) {
  await fetch(`/api/unpublish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/drafts');
}

export async function deleteBio(id) {
  await fetch(`/api/bio/${id}`, {
    method: 'DELETE'
  })
  Router.push('/')
}

export async function editBio(id) {
  await fetch(`/api/edit/${id}`, {
    method: 'PUT'
  })
  await Router.push('/');
}
