import bcrypt from 'bcrypt';

export const createHash = async password => {
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

export const isValidPassword = async (user, password) => {
    try {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Matches:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

