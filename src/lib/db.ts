import { createPool } from "slonik";

const conn = createPool("postgresql://localhost/test");

export default { conn };
