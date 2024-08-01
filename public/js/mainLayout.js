const setActive=(event)=>{
    // event.preventDefault();
    console.log("Active")
    const allLinks=document.querySelectorAll('.nav-link')
    allLinks.forEach((link)=>{
        link.classList.remove('active')
    })
    const activeLink=event.currentTarget;
    activeLink.classList.add('active')
}