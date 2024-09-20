import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'


export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to view checks.' }),
      { status: 401 }
    )
  }

  // Here you would typically send this to your backend API
  // const data = await fetch('https://api.uptime.com/v1/checks', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Token ${session.accessToken}`,
  //     'Content-Type': 'application/json',
  //   }
  // })

  // Mock API call
  const data: string[] = [
    "US-NY-New York",
    "US-CA-Los Angeles",
    "US-TX-Dallas",
    "United Kingdom-London",
    "Austria-Vienna",
    "Netherlands-Amsterdam",
    "Singapore-Singapore",
    "Argentina-Buenos Aires",
    "Australia-Brisbane",
    "Australia-Melbourne",
    "Australia-Perth",
    "Australia-Sydney",
    "Belgium-Brussels",
    "Bolivia-La Paz",
    "Brazil-Brasília",
    "Brazil-Sao Paulo",
    "Bulgaria-Sofia",
    "Canada-Montreal",
    "Canada-Toronto",
    "Canada-Vancouver",
    "Chile-Santiago",
    "China-Hong Kong",
    "Colombia-Bogota",
    "Dedicated-Australia-Sydney",
    "Dedicated-Brazil-Brasília",
    "Dedicated-Brazil-Sao Paulo",
    "Dedicated-Canada-Toronto",
    "Dedicated-Germany-Frankfurt",
    "Dedicated-India-Bangalore",
    "Dedicated-Japan-Tokyo",
    "Dedicated-Mexico-Mexico City",
    "Dedicated-Portugal-Lisbon",
    "Dedicated-Singapore-Singapore",
    "Dedicated-South Africa-Johannesburg",
    "Dedicated-United Kingdom-London",
    "Dedicated-US-CA-Los Angeles",
    "Dedicated-US-NY-New York",
    "Denmark-Copenhagen",
    "Egypt-Cairo",
    "Finland-Helsinki",
    "France-Paris",
    "Germany-Berlin",
    "Germany-Frankfurt",
    "Germany-Munich",
    "Ghana-Accra",
    "Greece-Athens",
    "India-Bangalore",
    "Indonesia-Jakarta",
    "Ireland-Dublin",
    "Israel-Tel Aviv",
    "Italy-Milan",
    "Japan-Osaka",
    "Japan-Tokyo",
    "Kenya-Nairobi",
    "Latvia-Riga",
    "Lithuania-Vilnius",
    "Luxembourg-Bettembourg",
    "Malaysia-Kuala Lumpur",
    "Mexico-Mexico City",
    "New Zealand-Auckland",
    "Nigeria-Lagos",
    "Norway-Oslo",
    "Panama-Panama City",
    "Peru-Lima",
    "Philippines-Manila",
    "Poland-Warsaw",
    "Portugal-Lisbon",
    "Puerto Rico-San Juan",
    "Romania-Bucharest",
    "Russia-Moscow",
    "Saudi Arabia-Riyadh",
    "Serbia-Belgrade",
    "South Africa-Cape Town",
    "South Africa-Johannesburg",
    "South Korea-Seoul",
    "Spain-Madrid",
    "Sweden-Stockholm",
    "Switzerland-Geneva",
    "Switzerland-Zurich",
    "Taiwan-Taipei",
    "Thailand-Bangkok",
    "Turkey-Ankara",
    "Ukraine-Kiev",
    "United Arab Emirates-Dubai",
    "United Kingdom-Edinburgh",
    "United Kingdom-Manchester",
    "United Kingdom-Portsmouth",
    "United Kingdom-Wolverhampton",
    "US-CA-Fremont",
    "US-CA-San Francisco",
    "US-CA-San Jose",
    "US-CO-Denver",
    "US-FL-Miami",
    "US-GA-Atlanta",
    "US-HI-Honolulu",
    "US-IL-Chicago",
    "US-MA-Boston",
    "US-MO-Kansas City",
    "US-NV-Las Vegas",
    "US-UT-Ogden",
    "US-VA-Manassas",
    "US-WA-Seattle",
    "Vietnam-Hanoi"
  ]

  return NextResponse.json(data)
}
