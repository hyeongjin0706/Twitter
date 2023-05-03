// abcd1234: $2b$10$2RNDKVhfDueHOjh6QrCWJe7YuIHHfKVCRLUy07nuMbxlp1VHxfdWy
let users = [
    {
        id: "1",
        username: "melon",
        password: "$2b$10$2RNDKVhfDueHOjh6QrCWJe7YuIHHfKVCRLUy07nuMbxlp1VHxfdWy",
        name: "이메론",
        email: "melon@melon.com",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU"
    }
]

export async function searchID(username) {
    return users.find((users) => users.username === username);
}
export async function createUser(user) {
    const created = {...user, id: Date.now().toString()};
    users.push(created);
    return created.id;
}



export async function login(user) {
    return users.filter((users) => users.username === user.username && users.password === user.password);
}