import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try {
        //we check the name entered
        const{name}=req.body
        if(!name){
            return res.status(401).send({message:'name is required'})     
           }
           //check if there is an existing category with same name
           const existingCategory = await categoryModel.findOne({name})
           if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exists'
            })
           }
           //if such category doest exist we save the category name entered
           
           const category = await new categoryModel({
            name,
            slug: slugify(name),
          }).save();
            //we converted the name into a slug using slugify and saved
           res.status(201).send({
            success:true,
            message :'new category created'
           })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })
    }
};

//update category
export const updateCategoryController = async(req,res) => {
    try {
        const{name}= req.body
        const {id}= req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        //send status
        res.status(200).send({
            success: true,
            message :"Category Updated Successfully",
            category,
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating category'
        })
    }
};
//get all category


export const categoryController =async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message :"All Categories List",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all categories'
    })
}
};


//get single category
export const singleCategoryController= async(req,res) => {
    try {
        const category =await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message:"Got single category successfully",
            category,
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting the category'
    })
    }
};


//delete category
export const deleteCategoryController = async (req,res)=> {


    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message:"Category Deleted successfully",
            
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting the category'
    })
    }


};
