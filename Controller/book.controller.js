const BookModel = require("../Modal/books.model");


// Create a book
const createbook = async (request, response) => {
    let { Title, Author, Price, Description } = request.body;
    if (!Title || !Author || !Price || !Description) {
        return response.status(401).json({
            message: "Please fill the all field"
        })
    }
    try {
        let booksData = await BookModel.create({ ...request.body });
        return response.status(201).json({
            message: "Create Succesfully",
            BookData: booksData
        })

    } catch (error) {
        return response.status(400).json({
            message: error.message
        })
    }

}

// get all book
const getallbook = async (request, response) => {
    try {
        let allbook = await BookModel.find({})
        return response.status(200).json({
            message: "All books fetched successfully",
            data: allbook
        })
    } catch (error) {
        return response.status(400).json({
            message: error.message
        })
    }
};
// Update
const updatebook = async (request, response) => {
    const { bookid } = request.params;

    if (!bookid) {
        return response.status(400).json({
            message: "Something went wrong"
        });
    }
    try {
        let updatebyid = await BookModel.findByIdAndUpdate(bookid, request.body);

        if (!updatebyid) {
            return response.status(404).json({
                message: "Book not found"
            });
        }
        return response.status(200).json({
            message: "Book updated successfully",
            data: updatebyid
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
// delete
const deletebook=async(request,response)=>{
    const { bookid } = request.params;

    if (!bookid) {
        return response.status(400).json({
            message: "Something went wrong"
        });
    }


    try {
        let deletebook=await BookModel.findOneAndDelete({ _id: bookid });
        console.log(deletebook)
        if (!deletebook) {
            return response.status(404).json({
                message: "Book not found"
            });
        }
        return response.status(200).json({
            message: "Book updated successfully",
            data: deletebook
        });
    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }

}
// Description
const description=async(request,response)=>{
    const { bookid } = request.params;

    if (!bookid) {
        return response.status(400).json({
            message: "Something went wrong"
        });
    }
    try {
        let bookdescription=await BookModel.findById(bookid)    
        return response.status(200).json({
            message: "Book updated successfully",
            data: bookdescription
        }); 
    } catch (error) {
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}



module.exports = { createbook, getallbook, updatebook,deletebook,description };
