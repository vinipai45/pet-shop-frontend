let sendButton = document.getElementById('sendButton')

sendButton.onclick = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Submitted your response!'
    })
}

window.onload = () => {
    if (localStorage.getItem('token') == null) {
        window.location.replace('../html/login.html')
    }


}