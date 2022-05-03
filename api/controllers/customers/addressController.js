const db = require("../../models");
const { customerAddressValidation } = require("../../utils/validation");
exports.address = async (req, res) => {
  try {
    let foundAddress = await db.CustomerAddress.findAll({
      where: { CustomerId: req.decoded.iduser },
    });
    if (foundAddress.length == 0) {
      return res.status(204).json({
        success: false,
        message: "ยังไม่มีที่อยู่",
      });
    }
    res.json({
      success: true,
      address: foundAddress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.findAddressById = async (req, res) => {
  try {
    let findAddress = await db.CustomerAddress.findOne({
      where: {
        id: req.params.AddressId,
      },
    });
    if (findAddress) {
      res.json({
        success: true,
        address: findAddress,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createAddress = async (req, res) => {
  const { error } = customerAddressValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    const CreateAddress = await db.CustomerAddress.create({
      CustomerId: req.decoded.iduser,
      fullName: req.body.fullName,
      streetAddress: req.body.streetAddress,
      district: req.body.district,
      province: req.body.province,
      zipCode: req.body.zipCode,
      phoneNumber: req.body.phoneNumber,
    });
    res.json({
      success: true,
      message: "เพิ่มข้อมูลที่อยู่สำเร็จ",
      data: CreateAddress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.editAddress = async (req, res) => {
  const { error } = customerAddressValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  try {
    await db.CustomerAddress.update(
      {
        CustomerId: req.decoded.iduser,
        fullName: req.body.fullName,
        streetAddress: req.body.streetAddress,
        district: req.body.district,
        province: req.body.province,
        zipCode: req.body.zipCode,
        phoneNumber: req.body.phoneNumber,
      },
      {
        where: { id: req.params.id },
      }
    );
    const returnAddress = await db.CustomerAddress.findByPk(req.params.id);
    res.status(201).json({
      success: true,
      message: "แก้ไขข้อมูลที่อยู่สำเร็จ",
      data: returnAddress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.setDefault = async (req, res) => {
  try {
    const foundCustomer = await db.Customer.update(
      {
        defaultAddress: parseInt(req.params.set),
      },
      {
        where: {
          id: req.decoded.iduser,
        },
      }
    );
    res.json({
      success: true,
      message: "ตั้งค่าที่อยู่เริ่มต้นสำเร็จ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    let deleteAddress = await db.CustomerAddress.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleteAddress == 0) {
      return res.status(400).json({
        success: false,
        message: "ไม่มีที่อยู่หรือถูกลบออกไปแล้ว",
      });
    }
    res.json({
      success: true,
      message: "ลบที่อยู่สำเร็จ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
