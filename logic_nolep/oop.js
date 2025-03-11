class Bank {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  register(person, memberType, initialDeposit) {
    let accountNumber = Math.floor(1000000 + Math.random() * 9000000);
    let minimumBalance = memberType === 'platinum' ? 50000 : 10000;

    if (initialDeposit < minimumBalance) {
      return 'Saldo awal kurang dari minimum saldo yang ditentukan';
    }

    let newAccount = memberType === 'platinum'
      ? new Platinum(person.nameCustomer, accountNumber, initialDeposit)
      : new Silver(person.nameCustomer, accountNumber, initialDeposit);

    person.bankAccount = newAccount;
    this.accounts.push(newAccount);

    return `Selamat datang ke ${this.name}, ${person.nameCustomer}. Nomor Akun anda adalah ${accountNumber}. Total saldo adalah ${initialDeposit}`;
  }
}

class Person {
  constructor(nameCustomer) {
    this.nameCustomer = nameCustomer;
    this.bankAccount = null;
  }
}

class Member {
  constructor(memberName, accountNumber, balance) {
    this.memberName = memberName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.transactions = [];
  }

  credit(amount) {
    if (amount < 10000) {
      return 'Belum memenuhi minimal uang yang dapat disetor';
    }
    this.balance += amount;
    this.transactions.push(new Transaction(amount, 'credit', 'nyetor'));
    return 'Anda sukses menyimpan uang ke dalam bank.';
  }

  debet(amount, note) {
    if (this.balance - amount < this.minimumBalance) {
      return 'Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.';
    }
    if (amount > this.balance) {
      return 'Saldo anda tidak cukup';
    }
    this.balance -= amount;
    this.transactions.push(new Transaction(amount, 'debet', note));
    return 'Anda sukses menarik uang dari bank';
  }

  transfer(targetAccount, amount) {
    if (this.balance - amount < this.minimumBalance) {
      return `Anda gagal transfer ke ${targetAccount.memberName}`;
    }
    this.balance -= amount;
    this.transactions.push(new Transaction(amount, 'debet', `transfer ke akun ${targetAccount.memberName}`));
    targetAccount.balance += amount;
    targetAccount.transactions.push(new Transaction(amount, 'credit', `transfer dari akun ${this.memberName}`));
    return `Anda sukses transfer ke ${targetAccount.memberName}`;
  }
}

class Platinum extends Member {
  constructor(memberName, accountNumber, balance) {
    super(memberName, accountNumber, balance);
    this.minimumBalance = 50000;
    this.type = 'platinum';
  }
}

class Silver extends Member {
  constructor(memberName, accountNumber, balance) {
    super(memberName, accountNumber, balance);
    this.minimumBalance = 10000;
    this.type = 'silver';
  }
}

class Transaction {
  constructor(nominal, status, note) {
    this.nominal = nominal;
    this.status = status;
    this.date = new Date();
    this.note = note;
  }
}


// TESTCASE
// TIDAK BOLEH MENGUBAH CODE DI BAWAH INI

let yudhistiraBank = new Bank('Yudhistira Bank')
let nadia = new Person('Nadia')

yudhistiraBank.register(nadia, 'platinum', 5000)
// Saldo awal kurang dari minimum saldo yang ditentukan
yudhistiraBank.register(nadia, 'platinum', 54000)
//Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 54000
let nadiaAccount = nadia.bankAccount

/* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
nadiaAccount.credit(300000)
// Anda sukses menyimpan uang ke dalam bank.

nadiaAccount.credit(1000)
// Belum memenuhi minimal uang yang dapat di setor

nadiaAccount.debet(200000, 'Beli Keyboard')
// Anda sukses menarik uang dari bank

nadiaAccount.debet(130000, 'Beli Keyboard Lagi')
// Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.
nadiaAccount.debet(600000, 'Bisa gak ya lebih besar dari balance ? ')
// Saldo anda tidak cukup

let semmi = new Person('Semmi Verian')
yudhistiraBank.register(semmi, 'silver', 10000000)
let semmiAccount = semmi.bankAccount

nadiaAccount.transfer(semmiAccount, 100000)
// Anda sukses transfer ke Semmi Verian
nadiaAccount.transfer(semmiAccount, 1000000)
// Anda gagal transfer ke Semmi Verian

console.log(semmiAccount)
// Silver {
//   memberName: 'Semmi Verian',
//   accountNumber: 1319650,
//   minimumBalance: 10000,
//   balance: 10100000,
//   transactions: [
//     Transaction {
//       nominal: 100000,
//       status: 'credit',
//       date: 2025-01-28T07:13:54.802Z,
//       note: 'transfer dari akun Nadia'
//     }
//   ],
//   type: 'silver'
// }

console.log(nadiaAccount)
// Platinum {
//   memberName: 'Nadia',
//   accountNumber: 3971487,
//   minimumBalance: 50000,
//   balance: 54000,
//   transactions: [
//     Transaction {
//       nominal: 300000,
//       status: 'credit',
//       date: 2025-01-28T07:13:54.800Z,
//       note: 'nyetor'
//     },
//     Transaction {
//       nominal: 200000,
//       status: 'debet',
//       date: 2025-01-28T07:13:54.801Z,
//       note: 'Beli Keyboard'
//     },
//     Transaction {
//       nominal: 100000,
//       status: 'debet',
//       date: 2025-01-28T07:13:54.802Z,
//       note: 'transfer ke akun Semmi Verian'
//     }
//   ],
//   type: 'platinum'
// }
