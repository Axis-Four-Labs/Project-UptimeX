# CRYPTOGRAPHY NOTES [0]

**Disclosure:**  
The content herein is based on readings from the following source:
```
Title: Introduction to Modern Cryptography (Third Edition)
Author: Jonathan Katz, Yehuda Lindell

Title: An Intensive Introduction to Cryptography
Author: Boaz Barak
```
These notes serve as a concise summary of the main ideas and reflect my own understanding of the material.

These are very good resources to assist with the notes taken in this file: [[NP-Hard and NP-Complete Problems](https://www.youtube.com/watch?v=e2cF8a5aAhE), [Introduction to Algorithms, 3rd Edition (MIT Press)](https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844)] 

---

## _Chapter 1: Introduction_ 
You must properly define the set of goals you want to achieve. Consider a the set of bits $\{0, 1\}$. We define an encryption function $E: (k, m) \rightarrow c$ to be the function mapping some secret key $k \in \{0, 1\}^n$ and a plaintext message $m \in \{0, 1\}^l$ into a ciphertext $c \in \{0, 1\}^L$ for soeme $L$. This is written in the form $c = E_k(m)$. We define a decryption function $D: (k, c) \rightarrow m$ to be the function mapping some secret key $k \in \{0, 1\}^n$ and some ciphertext $c \in \{0, 1\}^L$ back into the plaintext message $m \in \{0, 1\}^l$. This is written in the from $m=D_k(c)$.  Therefore, we can use the same $k$ for every encryption and decryption to always get the same $m$. 

For an encrytion scheme to be valid, we define what is called a _valid encryption scheme_:

**\[DEF\] — Valid Encryption Scheme**:
> ___Polynomial-time computable functions___: Polynomial time are functions or predicates computable by a turing machine (algorithm) in a time bounded by a polynomial of input size $n$. If a function $f(n)$ is polynomial bounded, then we say $f(n) = O(n^k)$. If a problem is to be solvable in polynomial time in one model, then it can too in another. Further, problems that are represented as binary strings are _concrete problems_ (which are polynomial solvable) with time complexity asymptotic upper bound $O(T(n))$. We assign these problems the complexity class $P$, the set of decision problems that are solvable by a deterministic Turing machine in polynomial time ([Complexity Class](https://en.wikipedia.org/wiki/Complexity_class)). Class $NP$ problems are non-deterministic, but polynomial time taking algorithms.

> ___Further Exploration___: Known algorithms that are polynomial time are Linear Search $O(n)$, Binary Search $O\left(\log(n)\right)$, Insertion Sort $O(n^2)$, Merge Sort $O\left(n\log(n))\right)$, and Matrix Multiplication $O(n^3)$. 

Let $l: \mathbf{N} \rightarrow \mathbf{N}$ and $C: \mathbf{N} \rightarrow \mathbf{N}$ be two function mappings for natural numbers to natural numbers.  

A pair of polynomial-time computable functions $(E,D)$ for mapping strings $\rightarrow$ strings is a _valid private key encription scheme_ or _encryption scheme_ with the `plaintext` length function $l(*)$ and `ciphertext` length function $C(*)$ if:

- $\forall n \in \mathbf{N}$,  
- $k \in \{0, 1\}^{n}$ and $m\in\{0,1\}^{l(n)}$  
- the length $| E_k(m)| = C(n)$ depends on n.  

As well, $D(k, E(k, m)) = m$.  

The subscript represents the first input, i.e., the _key_ to the encryption and decryption.  

We can write that last equation as $D_k(E_k(m)) = m$ as well.  

$E$ and $D$ are two pairs of algorithms that for every key $k\in\{0,1\}^n$, and plaintext $x\in\{0, 1,\}^{l(n)}$, $c=E_k(m)$ is a ciphertext of length $C(n)$.  

Such encryption scheme is valid if for every such $y$, $D_k(y)=x$.  

The decryption of an encryption $x$ is $x$ only if both $E$ and $D$ use the same $k$ key.

For any fixed $k$ krey, the map from message $m \rightarrow E_k(m)$ ciphertext is one-to-one, thus $|E_k(m)| \geq |m|$. The focus should remain on the plaintext length as the quantity to optimize in an encryption scheme. As $l(n)$ grows, the smaller length of $k$ that is needed to protect messages of equal length, hence becoming better. The function $l(n)$ tells us the possible length of a plaintext message $m$ for some key $k$ in context of bits.

A private-key encryption scheme is defined by specifying a `message space` $M$ with three algorithms:
1. Generator $G$ —  generates keys
2. Encrypting $E$ —  encrypts plaintext
3. Decryption $D$ —  decrypts ciphertext

A message space $M$ defines a set of possible messages within some scheme. The algorithm $G$ is a probabilistic algorithm introduces randomness into the scheme, which outputs a some key $k$ given some distribution. The algorithm $E$ takes an input key $k$, some message $m$, and outputs a ciphertext $c$ (defined above). The algorithm $D$ takes an input key $k$, some ciphertext $c$, and outputs a plaintext $m$ (defined above). 

A key-space $K$ represents all possible key outputs by $G$ uniformly. 

> ___Kerckhoffs's Principle___: A cryptographic system's security should depend solely on the secrecy of the key, not on the secrecy of the algorithm itself.


