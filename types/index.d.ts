import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface BookType {
    
    title: string;
    author: string;
}

export interface BookTypeID extends BookType {
    _id: string;
}

export interface ReviewType {

    title: string;
    text: string;
    rating: string;
    book: {
        _id: string;
        title: string;
        author: string;
        image_path_S: string;
}
    user: {
        _id: string;
        full_name: string
    }
    createdAt: string;
    updatedAt: string;
}

export interface ReviewTypeID extends ReviewType {
    _id: string;
}


export interface UserType {

    full_name: string;
    email: string;
    role: string;
    reviews: {
        _id: string;
        title: string;
        book:{
            _id: string;
            title: string;
            author: string;
        };
        rating: string;
        text: string;
}[];
    followers: {
        _id: string;
        full_name: string;
    }[];
    following: {
        _id: string;
        full_name: string;
        reviews: {
            _id: string;
            title: string;
            book:{
                _id: string;
                title: string;
                author: string;
            };
            rating: string;
            text: string;
            updatedAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
}[];
}

export interface UserTypeID extends UserType {
    _id: string;
}


export interface IAuthContext {
    signIn: (token:string, userId:string) => void;
    signOut: () => void;
    session?: { token: string; userId: string } | null;
    isLoading: boolean;
}

export type IResponseType = BookTypeID
export type IResponseType = ReviewTypeID