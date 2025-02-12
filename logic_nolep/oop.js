class Bank {
    constructor(nameBank){
      this.nameBank = nameBank
      this.accout = []
    }
    register(person, type, saldoAwal){
      let minimalSaldo = type === 'platinum' ? 50000 : 10000
      if(saldoAwal < minimalSaldo){
        console.log(`saldo awal kurang dari minimum saldo yang ditentukan`)
        return
      }
      let accountNumber = Math.floor(Math.random() * 9000000) + 1000000
      let newAccount = type === 'platinum' ? new Platinum(person.namePerson, accountNumber, saldoAwal) : new Silver(person.namePerson, accountNumber, saldoAwal)

      this.accout.push(newAccount)
      person.bankAccount = newAccount
      console.log(`Selamat datang di${this.nameBank}, ${person.namePerson}. nomor account anda  ${accountNumber}. Total saldo anda adalah ${saldoAwal}`)
    }
  }
  
  class Person {
    constructor(namePerson){
      this.namePerson = namePerson
      this.bankAccount = null
    }
  }
  
  class Member {
    constructor(memberName, accountNumber, minimumBalance, balance){
      this.memberName = memberName
      this.accountNumber = accountNumber
      this.minimalSaldo = minimumBalance
      this.balance = balance
      this.transactions = []
    }

    credit(amount){
      if(amount< 5000){
        console.log(`Belum memenuhi minimal uang yang dapat di setor`)
        return
      }
      this.balance += amount
      this.transactions.push(new Transaction(amount, 'credit', 'nyetor'))
      console.log(`Anda sukses menyimpan uang kedalam bank`)
    }

    debet(amount, note){
        if(this.balance -amount < this.minimumBalance){
          console.log(`saldo minimum anda tidak memenuhi untuk melakukan transaksi ini`)
          return
        }
        if(this.balance < amount){
          console.log(`saldo anda tidak cukup`)
          return
        }
        this.balance -= amount
        this.transactions.push(new Transaction(amount, 'debet', note))
        console.log('anda sukses menarik uang dari bank')
    }

    transfer(receiverAccount, amount){
      if(this.balance - amount < this.minimumBalance){
        console.log(`anda gagal transfer ${receiverAccount.memberName}`)
        return
      }
      this.balance -= amount
      receiverAccount.balance += amount
      
      this.transactions.push(new Transaction(amount, 'debet', `transfer ke ${receiverAccount.memberName}`))
      receiverAccount.transactions.push(new Transaction(amount, 'credit', `transfer dari akun ${this.memberName}`))

      console.log(`Anda sukse transfer ke ${receiverAccount.memberName}`)
    }
  }
  
  class Platinum extends Member{
    // Tulis Code Disini
    constructor(memberName, accountNumber, balance){
      super(memberName, accountNumber, 50000, balance)
      this.type = 'platinum'
    }
  }
  
  class Silver extends Member{
    // Tulis Code Disini
    constructor(memberName, accountNumber, balance){
      super(memberName, accountNumber, 10000, balance)
      this.type = 'silver'
    }
  }
  
  class Transaction {
    // Tulis Code Disini
    constructor(nominal, status, note){
      this.nominal = nominal
      this.status = status
      this.date = new Date()
      this.note = note
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