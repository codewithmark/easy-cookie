# easy-cookie

# 🍪 Cookie Utility Class (`c`)

A lightweight JavaScript utility class for handling browser cookies easily.

Designed for beginner web developers — no dependencies, no complexity.

## ✅ Features

- Simple cookie creation with expiration support
- Automatically handles strings, objects, and arrays
- Easy cookie retrieval with original data type preserved
- Simple cookie deletion
- Built-in safe parsing

---

 🚀 Usage Examples

```js
// Add a cookie (default 1-day expiry)
c.add('token', 'abc123');

// Add with custom expiry
c.add('token', 'abc123', '2days');

// Store an object
c.add('user', { name: 'Alice', role: 'admin' });

// Store an array
c.add('ids', [1, 2, 3, 4]);

// Get the cookie value
const token = c.get('token');     // returns "abc123"
const user = c.get('user');       // returns { name: 'Alice', role: 'admin' }
const ids = c.get('ids');         // returns [1, 2, 3, 4]

// Delete a cookie
c.delete('token');
 
