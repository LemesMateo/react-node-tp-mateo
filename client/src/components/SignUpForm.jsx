onSubmit: async(values)=>{
    const NewUser = {...values}
    await fetch("https://localhost:5000/api/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(NewUser)
    }).then(() => {
        console.log(NewUser);
    });
};