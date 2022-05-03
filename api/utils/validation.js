//Validation
const Joi = require("joi");
//Customer Register Validation
const customerRegisterValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required().messages({
            "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่ Username`,
        }),
        email: Joi.string().min(6).required().email().messages({
            "string.email": `รูปแบบ E-mail ไม่ถูกต้อง`,
            "string.empty": `E-mail ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `E-mail ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่ E-mail`,
        }),
        password: Joi.string().min(8).required().messages({
            "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
            "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
        }),
        defaultAddress: Joi.string().max(8).messages({
            "string.max": `มีข้อผิดพลาด ที่อยู่เกิน {#limit} ตัวอักษร`,
        }),
    });
    return schema.validate(data);
};
//Customer Profile Validation
const customerProfileValidation = (data) => {
    const schema = Joi.object({
        displayName: Joi.string().min(6).required().messages({
            "string.empty": `Diaplay Name ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `Diaplay Name ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        }),
        fullName: Joi.string().min(6).required().messages({
            "string.empty": `ชื่อ-นามสกุล ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `ชื่อ-นามสกุล ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
        }),
        phoneNumber: Joi.string().max(10).required().messages({
            "string.empty": `เบอร์โทรศัพท์ไม่สามารถเป็นค่าว่างได้`,
            "string.max": `เบอร์โทรศัพท์ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่เบอร์โทรศัพท์`,
        }),
        sex: Joi.string().max(10).required().messages({
            "string.empty": `โปรดระบุเพศ`,
            "string.max": `พบข้อผิดพลาด ค่าของgenderต้องไม่เกิน{#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่`,
        }),
    });
    return schema.validate(data);
};

//Customer Login Validation
const customerLoginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email().messages({
            "string.email": `รูปแบบ E-mail ไม่ถูกต้อง`,
            "string.empty": `E-mail ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `E-mail ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่ E-mail`,
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
            "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
        }),
    });
    return schema.validate(data);
};

//Customer Change Password Validation
const customerChangePasswordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(6).required().messages({
            "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
            "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
        }),
    });
    return schema.validate(data);
};
//Customer Address Validation
const customerAddressValidation = (data) => {
    const schema = Joi.object({
        // id: Joi.number(),
        // customerId: Joi.number(),
        fullName: Joi.string().min(3).required().messages({
            "string.empty": `ชื่อ-นามสกุลไม่สามารถเป็นค่าว่างได้`,
            "string.min": `ชื่อ-นามสกุลต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่ชื่อ-นามสกุล`,
        }),
        district: Joi.string().min(2).required().messages({
            "string.empty": `อำเภอไม่สามารถเป็นค่าว่างได้`,
            "string.min": `อำเภอต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่อำเภอ`,
        }),
        province: Joi.string().min(3).required().messages({
            "string.empty": `จังหวัดไม่สามารถเป็นค่าว่างได้`,
            "string.min": `จังหวัดต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่จังหวัด`,
        }),
        zipCode: Joi.string().min(3).required().messages({
            "string.empty": `รหัสไปษณีย์ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `รหัสไปษณีย์ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่รหัสไปษณีย์`,
        }),
        streetAddress: Joi.string().min(10).required().messages({
            "string.empty": `ที่อยู่ไม่สามารถเป็นค่าว่างได้`,
            "string.min": `ที่อยู่ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่ที่อยู่`,
        }),
        phoneNumber: Joi.string().max(10).required().messages({
            "string.empty": `เบอร์โทรศัพท์ไม่สามารถเป็นค่าว่างได้`,
            "string.max": `เบอร์โทรศัพท์ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
            "any.required": `จำเป็นต้องใส่เบอร์โทรศัพท์`,
        }),
    });
    return schema.validate(data);
};

//backend  Register Validation //
const RegisterValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .regex(/^[_@/a-z0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": `Username จะต้องเป็นภาษาอังกฤษและตัวเลขเท่านั้น`,
                "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
                "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
                "any.required": `จำเป็นต้องใส่ Username`,
            }),
        password: Joi.string()
            .min(8)
            .regex(/^[_@/a-z0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": `รหัสผ่านจะต้องเป็นภาษาอังกฤษและตัวเลขหรือตัวอักษรพิเศษเท่านั้น`,
                "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
                "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
                "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
            }),
        serial: Joi.string()
            .min(6)
            .regex(/^[_a-zA-Z0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": `รูปแบบ Serial ไม่ถูกต้อง`,
                "string.empty": `Serial ไม่สามารถเป็นค่าว่างได้`,
                "string.min": `Serial ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
                "any.required": `จำเป็นต้องใส่ Serial`,
            }),
    });
    return schema.validate(data);
};

//backend Login Validation
const LoginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .regex(/^[a-z0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": `Username จะต้องเป็นภาษาอังกฤษและตัวเลขเท่านั้น`,
                "string.empty": `Username ไม่สามารถเป็นค่าว่างได้`,
                "string.min": `Username ต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
                "any.required": `จำเป็นต้องใส่ Username`,
            }),
        password: Joi.string()
            .min(8)
            .regex(/^[_@/ A-Za-z0-9]+$/)
            .required()
            .messages({
                "string.pattern.base": `รหัสผ่านจะต้องเป็นภาษาอังกฤษและตัวเลขหรือตัวอักษรพิเศษเท่านั้น`,
                "string.empty": `รหัสผ่านไม่สามารถเป็นค่าว่างได้`,
                "string.min": `รหัสผ่านต้องไม่ต่ำกว่า {#limit} ตัวอักษร`,
                "any.required": `จำเป็นต้องใส่รหัสผ่าน`,
            }),
    });
    return schema.validate(data);
};
module.exports.customerRegisterValidation = customerRegisterValidation;
module.exports.customerProfileValidation = customerProfileValidation;
module.exports.customerLoginValidation = customerLoginValidation;
module.exports.customerChangePasswordValidation = customerChangePasswordValidation;
module.exports.customerAddressValidation = customerAddressValidation;
module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;