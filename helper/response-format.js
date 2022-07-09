module.exports = {

    success : function (message , data) {
        return {
            status: 200,
            message: message,
            data: data
        };
    },
    
    failed : function (message , err) {
        return {
            status: 500,
            message: message,
            error: err
        };
    },
    
    notFound : function (message) {
        return {
            status: 404,
            message: `${message} not found`
        };
    }
    
    }