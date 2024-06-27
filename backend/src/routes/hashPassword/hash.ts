import bcrypt from 'bcryptjs';

const hashpass = async (password: string) => {
  return await bcrypt.hash(password, 10);
}

const comparepass = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}

export { hashpass, comparepass };

// export const BACKEND_URL="http://127.0.0.1:8787"
// // export const BACKEND_URL="https://backend.prayagtushar2016.workers.dev"