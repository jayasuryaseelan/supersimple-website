import hashlib
import os
import base64

def generate_scrypt_hash(password, n=16384, r=8, p=1, dklen=64):
    salt = os.urandom(16)  # generate a random 16-byte salt
    key = hashlib.scrypt(
        password.encode(),
        salt=salt,
        n=n,
        r=r,
        p=p,
        dklen=dklen
    )
    # Encode the salt and key as base64 for storage
    salt_b64 = base64.b64encode(salt).decode('utf-8')
    key_b64 = base64.b64encode(key).decode('utf-8')
    scrypt_hash = f'scrypt:{n}:{r}:{p}${salt_b64}${key_b64}'
    return scrypt_hash

password = "root@123"
scrypt_hash = generate_scrypt_hash(password)
print(scrypt_hash)
