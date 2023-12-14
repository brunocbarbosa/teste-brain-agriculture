import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.ruralProducer.upsert({
    where: { cpf_or_cnpj: '19558798002' },
    update: {},
    create: {
      cpf_or_cnpj: '19558798002',
      producer_name: 'Alice',
      farm_name: 'Brejal',
      city: 'Pouso Alegre',
      state: 'MG',
      total_area: 5000,
      agricultural_area: 2000,
      vegetation_area: 2000,
      planted_crops: {
        createMany: {
          data: [
            {
              name: 'ALGODAO',
            },
            {
              name: 'MILHO',
            },
          ],
        },
      },
    },
  })
  const bruno = await prisma.ruralProducer.upsert({
    where: { cpf_or_cnpj: '98639102015' },
    update: {},
    create: {
      cpf_or_cnpj: '98639102015',
      producer_name: 'Bruno',
      farm_name: 'Passaros',
      city: 'São Paulo',
      state: 'SP',
      total_area: 15000,
      agricultural_area: 5000,
      vegetation_area: 5000,
      planted_crops: {
        createMany: {
          data: [
            {
              name: 'ALGODAO',
            },
            {
              name: 'CAFE',
            },
          ],
        },
      },
    },
  })
  const marcos = await prisma.ruralProducer.upsert({
    where: { cpf_or_cnpj: '46421445012' },
    update: {},
    create: {
      cpf_or_cnpj: '46421445012',
      producer_name: 'Marcos',
      farm_name: 'Feliz',
      city: 'Congonhal',
      state: 'MG',
      total_area: 30000,
      agricultural_area: 10000,
      vegetation_area: 10000,
      planted_crops: {
        createMany: {
          data: [
            {
              name: 'SOJA',
            },
            {
              name: 'CANA_DE_ACUCAR',
            },
            {
              name: 'MILHO',
            },
          ],
        },
      },
    },
  })
  console.log(alice, bruno, marcos)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
