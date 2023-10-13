const usersModel = {
    getAll:'SELECT * FROM users',

    getByID:'SELECT * FROM users WHERE id = ?',

    addUser:`INSERT 
    INTO 
    users(username,
        email,password,
        name,
        lastname,
        phone_number,
        role_id,is_active)
         VALUES(?,?,?,?,?,?,?,?)`,

getBYUserame:
    `Select
    id
    FROM
    Users
    WHERE username = ?`,

    getBYEmail:
    `Select
    id
    FROM
    Users
    WHERE email = ?`
    }


module.exports = usersModel;
