'use server';
import { connectToDb } from '@/lib/utils';
import { User } from '@/lib/models';
import { SignupForm } from '../signup/page';
import { SigninForm } from '../signin/page';

export async function signup(formData: SignupForm) {
  const { email, fullName, username, password } = formData;
  await connectToDb();

  try {
    const response = await User.create({
      email,
      fullname: fullName,
      username,
      password,
    });
    console.log(response);

    return {
      id: response._id,
      username: response.username,
    };
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function signin(formData: SigninForm) {
  const { email, password } = formData;
  await connectToDb();

  try {
    const response = await User.findOne({ email });
    console.log(response.username);
    if (response.password !== password) {
      return false;
    }
    console.log(response);

    return {
      id: response._id,
      username: response.username,
    };
  } catch (e) {
    console.log(e);
    return false;
  }
}
