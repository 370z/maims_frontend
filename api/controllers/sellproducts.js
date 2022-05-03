    const express = require("express");
    const fs = require("fs");
    const path = require('path');
    const db = require("../models");

    exports.findAll = async(req, res) => {
        let findSeller = await db.tbl_userdetail.findOne({
            where: {
                UserId: req.decoded.iduser
            }
        })
        await db.tbl_sellproducts.findAll({
                where: {
                    SellerId: findSeller.id
                }
            })
            .then((data) => {
                res.status(200).json({
                    statusCode: 200,
                    message: "Data in Found",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };

    exports.findOne = (req, res) => {
        db.tbl_sellproducts.findOne({
            include:[db.tbl_userdetail],
            where:{
                // UserId: req.decoded.iduser,
                id: req.params.id
            }
        })
            .then((data) => {
                res.status(200).json({
                    statusCode: 200,
                    message: "Data in Found",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };

    exports.create = async(req, res) => {
        let findSeller = await db.tbl_userdetail.findOne({
            where: {
                UserId: req.decoded.iduser
            }
        })
        await db.tbl_sellproducts.create({
                productname: req.body.productname,
                productprice: req.body.productnumber,
                productnumber: req.body.productnumber,
                productdetail: req.body.productdetail,
                productstatus: req.body.productstatus,
                productimg: 'xxx.jpg',
                SellerId: findSeller.id
            })
            .then((data) => {
                res.status(200).json({
                    statusCode: 201,
                    message: "User Created Successfully",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };
    exports.updatestatus = async(req, res) => {
        console.log(req.body)
        try {
            console.log(req.body)
            let updateProduct = await db.tbl_sellproducts.update({
                productstatus: req.body.productstatus,
            }, {
                where: {
                    id: req.params.id,
                },
            })
            let findUpdateProduct = await db.tbl_sellproducts.findOne({
                where: {
                    id: req.params.id,
                }
            })
            if (updateProduct) {
                res.status(200).json({
                    statusCode: 201,
                    message: "User Update Successfully",
                    data: findUpdateProduct,
                    id: req.params.id
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }

    };

    exports.update = (req, res) => {
        db.tbl_sellproducts.update({
                productname: req.body.productname,
                productprice: req.body.productprice,
                productnumber: req.body.productnumber,
                productdetail: req.body.productdetail,
                productstatus: req.body.productstatus,
            }, {
                where: {
                    id: req.params.id,
                },
            })
            .then((data) => {
                res.status(200).json({
                    statusCode: 201,
                    message: "User Update Successfully",
                    data: data,

                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };

    exports.deleteimg = async(req, res) => {
        const file = req.params.id;
        fs.unlink(`${process.env.FILE_UPLOAD_PATH}/product/${file}`, async(err) => {
            if (err) {
                res.status(400).json({
                    statusCode: 400,
                    message: "Failed to delete image files.",
                    data: data
                })
            } else {
                res.status(200).json({
                    statusCode: 204,
                })
            }
            caches(err => {
                res.status(500).send(err);
            })
        })

    }

    exports.img = async(req, res, ) => {
        if (!req.files) {
            res.status(400).json({
                statusCode: 400,
                message: "No files sent"
            })
        }
        const file = req.files.files;
        console.log(file);
        file.name = `photo_${req.params.id}${
            path.parse(file.name).ext
        }`;
        console.log(file);
        file.mv(`${process.env.FILE_UPLOAD_PATH}/product/${file.name}`, async(err) => {
            if (err) {
                res.status(400).json({
                    statusCode: 400,
                    message: "Copying images to the server failed."
                })
            }
            try {
                db.tbl_sellproducts.update({
                    productimg: file.name
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(data => {
                    return res.status(200).json({
                        statusCode: 201,
                        message: 'Update Img Successfully',
                        data: data,
                        namefile: file.name
                    })
                });
            } catch (err) {
                res.status(400).json({
                    statusCode: 400,
                    message: "Failed to save the image."
                })
            }
        });
    }

    exports.deleteOne = (req, res) => {
        db.tbl_sellproducts.destroy({
                where: {
                    id: req.params.id
                }
            }).then(data => {
                res.status(200).json({
                    statusCode: 204,
                    message: "User Deleted Successfully",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };

    exports.deleteAll = (req, res) => {
        db.tbl_sellproducts.destroy({ where: {} })
            .then((data) => {
                res.status(200).json({
                    statusCode: 204,
                    message: "User Deleted All Successfully",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    };

    exports.showproduct = (req, res) => {
        db.tbl_sellproducts.findAll({
                include: [db.tbl_userdetail]
            })
            .then((data) => {
                res.status(200).json({
                    statusCode: 200,
                    message: "Have Product in Database",
                    data: data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    statusCode: 400,
                    message: "No Product in Database",

                })
            })
    }