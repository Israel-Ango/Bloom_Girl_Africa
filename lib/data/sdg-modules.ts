import { SDGModule } from '@/types'

export const SDG_MODULES: SDGModule[] = [
  {
    id: 1, sdg_number: 1, order_index: 1,
    title: 'No Poverty',
    description: 'End poverty in all its forms everywhere',
    color: '#E5243B',
    emoji: '🤝',
    content: {
      introduction: 'Poverty means not having enough money, food, shelter, or opportunities to live a decent life. About 700 million people around the world still live in extreme poverty, surviving on less than $2.15 a day. In Africa, many girls and women are among those most affected. But here\'s the good news — YOU can be part of the solution!',
      sections: [
        {
          heading: 'What is Poverty and Why Does It Matter?',
          body: 'Poverty is not just about money. It is about not having access to education, healthcare, clean water, and safe homes. When people are poor, they cannot fully participate in society or reach their potential. Girls are often hit hardest because they may be pulled out of school, married early, or forced to work instead of learning.',
          africa_example: 'In Nigeria, many girls in rural areas must fetch water for hours each day instead of attending school. This cycle of poverty keeps families stuck for generations. Organizations like the Fountain of Life are working to build water points near schools so girls can study instead.'
        },
        {
          heading: 'How Can We End Poverty?',
          body: 'Ending poverty requires everyone working together. Governments must create jobs, provide safety nets, and ensure equal access to resources. Communities must support each other. And individuals — like you — can learn skills, stay in school, save money, and support others.',
          africa_example: 'In Kenya, the M-Pesa mobile money system has helped millions of poor families save money safely, pay for school fees, and start small businesses. Girls who learn financial literacy skills are more likely to lift their families out of poverty.'
        },
        {
          heading: 'Girls and Financial Empowerment',
          body: 'Financial empowerment means having the knowledge and skills to manage money well. When girls learn to save, budget, and invest, they become financially independent and can support their families and communities. Skills like entrepreneurship — starting and running a business — are powerful tools against poverty.',
          africa_example: 'In Ghana, the "Girls\' Financial Literacy" program has taught thousands of teenage girls how to save money, open bank accounts, and start small businesses selling crafts, food, and services. Many have become breadwinners for their families by age 18.'
        }
      ],
      inspiring_story: {
        name: 'Malaika Uwimana',
        country: 'Rwanda',
        story: 'Growing up in rural Rwanda, Malaika\'s family struggled to buy food and school supplies. At 14, she joined a savings group at her school where girls saved small amounts each week. By 16, she had enough to buy materials to make jewelry. Today at 20, she runs a jewelry business employing 5 other girls in her village, and she paid for her own secondary school education.',
        achievement: 'Founder of "Shine Bright Rwanda" jewelry cooperative'
      },
      key_takeaways: [
        'Poverty affects billions of people, especially girls in Africa',
        'Education is the most powerful tool to escape poverty',
        'Financial literacy — saving, budgeting, and investing — empowers girls',
        'Community support and cooperation help fight poverty together',
        'Every girl has the potential to break the cycle of poverty'
      ],
      reflection: 'Think about your own community. What is one thing that causes poverty there? What is one action you or your community could take to address it? Write down your thoughts.',
      activity: 'Create a simple "Dream Budget" — list 5 things you want to achieve in the next 5 years. Next to each, write what it would cost and how you could save or earn the money needed.'
    }
  },
  {
    id: 2, sdg_number: 2, order_index: 2,
    title: 'Zero Hunger',
    description: 'End hunger, achieve food security and improved nutrition',
    color: '#DDA63A',
    emoji: '🌾',
    content: {
      introduction: 'Hunger is one of the most urgent challenges in the world today. About 828 million people go to bed hungry every night. In Africa, many children, especially girls, suffer from malnutrition — not getting enough nutritious food to grow and develop properly. SDG 2 calls on us to end hunger, improve nutrition, and create sustainable food systems.',
      sections: [
        {
          heading: 'Understanding Hunger and Malnutrition',
          body: 'There are two types of hunger: not having enough food (undernutrition) and not having the right foods (malnutrition). Even if someone eats every day, they may be malnourished if their diet lacks important nutrients like iron, vitamins, and protein. Girls are especially vulnerable because their growing bodies need more nutrients, and cultural practices sometimes give boys more food.',
          africa_example: 'In Ethiopia, the National Nutrition Program has worked with communities to ensure that pregnant women and girls receive iron supplements and nutritious foods. This has reduced child malnutrition rates by 30% in some regions.'
        },
        {
          heading: 'Sustainable Farming and Food Systems',
          body: 'Food security means everyone has access to enough safe and nutritious food. To achieve this, we need sustainable farming — growing food in ways that protect the environment and can continue for future generations. This includes using less water, protecting soil, reducing food waste, and growing diverse crops.',
          africa_example: 'In Uganda, women farmers have adopted a technique called "intercropping" — planting beans alongside maize. The beans add nutrients to the soil and the family gets both corn and protein from beans. This has doubled some families\' food supply without additional cost.'
        },
        {
          heading: 'Girls\' Role in Food Security',
          body: 'Women and girls produce more than 60% of Africa\'s food, yet they often own less land and have less access to farming tools and training. When girls and women have equal access to agricultural resources, food production increases significantly. Girls who stay in school also learn better nutrition practices and can teach their families.',
          africa_example: 'In Tanzania, the "Girl Farmer" initiative trains teenage girls in modern organic farming techniques during school holidays. Girls return home with seeds, tools, and knowledge to help their families grow more diverse, nutritious foods.'
        }
      ],
      inspiring_story: {
        name: 'Amara Diallo',
        country: 'Senegal',
        story: 'When Amara was 13, her village in Senegal experienced a severe drought. Many families, including hers, went hungry. She learned from her grandmother about traditional drought-resistant crops. Amara started a small school garden using these ancient seeds and modern organic techniques she learned from YouTube videos at the local library. By 17, her garden fed 20 families through the dry season.',
        achievement: 'Youth Agricultural Champion, Senegal Ministry of Agriculture 2023'
      },
      key_takeaways: [
        'Hunger and malnutrition affect millions of girls and women in Africa',
        'Sustainable farming protects the environment while producing more food',
        'Girls and women are key to food security when given equal opportunities',
        'Nutrition knowledge helps families make better food choices',
        'Small actions like school gardens can have big community impact'
      ],
      reflection: 'What foods are commonly eaten in your community? Are they nutritious? What one change could improve your family\'s nutrition?',
      activity: 'Design a "Rainbow Meal" — plan a meal using foods of 5 different colors (red, orange, yellow, green, purple). Research what nutrients each color provides.'
    }
  },
  {
    id: 3, sdg_number: 3, order_index: 3,
    title: 'Good Health & Well-Being',
    description: 'Ensure healthy lives and promote well-being for all at all ages',
    color: '#4C9F38',
    emoji: '💚',
    content: {
      introduction: 'Good health is not just the absence of disease — it means feeling well physically, mentally, and emotionally. SDG 3 aims to ensure that everyone, everywhere, can live a long and healthy life. For girls in Africa, access to healthcare, understanding of sexual and reproductive health, and mental wellness are especially important topics.',
      sections: [
        {
          heading: 'Physical Health: Knowing Your Body',
          body: 'Understanding your body is the first step to good health. Girls need access to healthcare checkups, vaccinations, clean water, and sanitation. Puberty, menstrual health, and sexual and reproductive health are important topics that every girl deserves to learn about without shame. Having this knowledge protects girls from health risks and empowers them to make informed decisions.',
          africa_example: 'In Kenya, the "Menstrual Health" program provides free sanitary pads and health education to girls in rural schools. Before the program, 1 in 10 girls missed school every month due to their period. After, attendance increased by 95% during menstruation periods.'
        },
        {
          heading: 'Mental Health: It\'s Okay Not to Be Okay',
          body: 'Mental health is just as important as physical health. Depression, anxiety, and stress are real conditions that affect many young people. In many African communities, mental health is not talked about openly, which means people suffer in silence. Every girl deserves a safe space to express feelings, seek support, and develop emotional resilience.',
          africa_example: 'In South Africa, the "Sikhuluma" (We Speak) program trains peer counselors in schools to create safe spaces for students to discuss mental health. Thousands of students have learned coping skills, and cases of depression have been identified and treated early.'
        },
        {
          heading: 'HIV/AIDS and Other Health Challenges',
          body: 'Young women in sub-Saharan Africa are disproportionately affected by HIV/AIDS — making up more than 63% of new infections among young people aged 15-24. Understanding how HIV spreads, how to protect yourself, and how to get tested is life-saving knowledge. Stigma around HIV must be ended so people can get treatment and live full lives.',
          africa_example: 'In Zimbabwe, the DREAMS (Determined, Resilient, Empowered, AIDS-free, Mentored, and Safe) program has reduced HIV infections among adolescent girls by 25-40% by combining health education with economic empowerment and safety programs.'
        }
      ],
      inspiring_story: {
        name: 'Dr. Ngozi Adeyemi',
        country: 'Nigeria',
        story: 'Growing up in Lagos, Ngozi watched her mother die from complications that could have been prevented with proper healthcare. At 15, she volunteered at a community health clinic. She went on to study medicine, specializing in maternal health. Today, Dr. Ngozi runs 10 free health clinics across rural Nigeria, having helped over 50,000 women and girls access healthcare.',
        achievement: 'Founder of "HealthFirst Nigeria" — 50,000+ patients served'
      },
      key_takeaways: [
        'Good health includes physical, mental, and emotional well-being',
        'Girls deserve access to reproductive and sexual health education',
        'Mental health is real and important — seeking help is brave',
        'HIV/AIDS knowledge and prevention saves lives',
        'Every girl deserves quality healthcare without discrimination'
      ],
      reflection: 'How do you take care of your health? What is one thing you could do to improve your physical or mental well-being this week?',
      activity: 'Create a "Wellness Wheel" — draw a circle with 6 sections (physical, mental, emotional, social, sleep, nutrition). Rate each area 1-10 and identify one area to improve.'
    }
  },
  {
    id: 4, sdg_number: 4, order_index: 4,
    title: 'Quality Education',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning',
    color: '#C5192D',
    emoji: '📚',
    content: {
      introduction: 'Education is one of the most powerful forces for change in the world. SDG 4 calls for quality education for every child — not just access to school, but learning that is meaningful, relevant, and empowering. In Africa, millions of girls still face barriers to education including poverty, early marriage, gender discrimination, and lack of schools. Yet when girls are educated, entire communities transform.',
      sections: [
        {
          heading: 'Why Girls\' Education Changes Everything',
          body: 'When a girl receives quality education, the benefits multiply. She is more likely to marry later, have healthier children, earn higher income, and invest back in her community. An educated girl is three times less likely to be infected with HIV. Countries that educate girls see faster economic growth, reduced poverty, and better health outcomes for everyone.',
          africa_example: 'In Rwanda, after the government made secondary education free and equal for girls and boys, the country saw a dramatic increase in women in leadership. Today, Rwanda has the highest percentage of women in parliament in the world at 61% — directly linked to investing in girls\' education.'
        },
        {
          heading: 'Barriers to Girls\' Education in Africa',
          body: 'Despite progress, many girls still cannot access quality education. Common barriers include: long distances to school with safety risks, poverty making fees or supplies unaffordable, domestic responsibilities leaving no time for school, early marriage, lack of female teachers as role models, and schools without separate toilets for girls. Understanding these barriers is the first step to removing them.',
          africa_example: 'In Mali, the "Safe Schools" program built schools within 3km of every village and hired female teachers from local communities. Girls\' enrollment increased by 85% because parents felt their daughters were safe and had role models to look up to.'
        },
        {
          heading: 'STEM and the Future of African Girls',
          body: 'Science, Technology, Engineering, and Mathematics (STEM) careers are among the fastest-growing and best-paying in the world. Yet girls are often discouraged from pursuing STEM subjects. Breaking this barrier is crucial for Africa\'s development. When African girls learn coding, engineering, and science, they solve Africa\'s unique problems using African knowledge.',
          africa_example: 'In South Africa, the "GirlCode" initiative has trained over 10,000 girls in coding and technology. Graduates have built apps to help farmers monitor weather, platforms to connect women entrepreneurs, and health tools to track disease outbreaks in rural areas.'
        }
      ],
      inspiring_story: {
        name: 'Farida Hassan',
        country: 'Somalia',
        story: 'Farida grew up in Mogadishu during conflict, where schools were often closed. She taught herself mathematics from books she found in the rubble. At 17, she won a scholarship to study in Uganda. Today, Farida is a mathematics teacher and the founder of "Learn Somalia" — an online education platform that has reached over 200,000 students in areas with no schools.',
        achievement: 'Africa Education Innovator Award 2024, UNESCO'
      },
      key_takeaways: [
        'Quality education is a right for every girl, not a privilege',
        'Educated girls transform families, communities, and nations',
        'Barriers to girls\' education must be actively removed',
        'STEM education opens doors to Africa\'s future for girls',
        'Learning never stops — lifelong learning is key to growth'
      ],
      reflection: 'What barriers to education exist in your community? If you could change one thing about education in your area, what would it be and why?',
      activity: 'Write a letter to your 25-year-old self about the education you want to achieve and how you will use it to change your community.'
    }
  },
  {
    id: 5, sdg_number: 5, order_index: 5,
    title: 'Gender Equality',
    description: 'Achieve gender equality and empower all women and girls',
    color: '#FF3A21',
    emoji: '⚖️',
    content: {
      introduction: 'Gender equality means that all people — regardless of whether they are girls, boys, women, or men — have equal rights, opportunities, and respect. SDG 5 is at the heart of the Bloom Girl Africa mission. It calls for ending discrimination, violence, and harmful practices against women and girls everywhere. Gender equality is not just a women\'s issue — it benefits everyone.',
      sections: [
        {
          heading: 'Understanding Gender Inequality',
          body: 'Gender inequality means that one gender is treated as less valuable or capable than another. It shows up in many ways: girls being denied education, women earning less money for the same work, women being excluded from leadership, girls facing early marriage and pregnancy, and gender-based violence. These inequalities are not natural — they are created by customs, laws, and attitudes that can and must be changed.',
          africa_example: 'In parts of sub-Saharan Africa, women own less than 20% of land despite doing most of the agricultural work. When women gain equal land rights, studies show that agricultural productivity increases by 20-30% because women invest in sustainable farming practices.'
        },
        {
          heading: 'Harmful Practices That Must End',
          body: 'Some cultural practices harm girls and women. Female Genital Mutilation/Cutting (FGM/C) affects over 200 million girls and women worldwide and causes severe health complications. Child marriage forces girls as young as 9 to marry, ending their education and endangering their health. These practices are human rights violations and are being challenged by brave communities across Africa.',
          africa_example: 'In Senegal, the Tostan organization used community dialogue — not outside pressure — to help over 8,000 communities voluntarily abandon FGM/C and child marriage. By involving whole communities including men and religious leaders, lasting change was achieved.'
        },
        {
          heading: 'Women\'s Leadership and Representation',
          body: 'Women must be equally represented in leadership — in governments, companies, schools, and communities. When women lead, policies better reflect the needs of everyone. Research shows that companies with diverse leadership including women are more profitable and innovative. Every girl who becomes a leader opens doors for others who follow.',
          africa_example: 'Dr. Ngozi Okonjo-Iweala from Nigeria became the first woman and first African to lead the World Trade Organization in 2021. Ellen Johnson Sirleaf was Africa\'s first female president. These trailblazers prove that African women belong in every room where decisions are made.'
        }
      ],
      inspiring_story: {
        name: 'Wangari Maathai',
        country: 'Kenya',
        story: 'Wangari Maathai faced discrimination as a woman in Kenya, but refused to be silenced. She founded the Green Belt Movement, teaching women to plant trees to combat deforestation and poverty. She connected women\'s rights to environmental rights, arguing that you cannot have one without the other. In 2004, she became the first African woman to win the Nobel Peace Prize.',
        achievement: 'Nobel Peace Prize 2004 — First African woman to receive it'
      },
      key_takeaways: [
        'Gender equality benefits everyone — not just women and girls',
        'Harmful practices like FGM/C and child marriage violate human rights',
        'Women and girls deserve equal rights in education, law, and leadership',
        'Every act of speaking up for fairness is a step toward equality',
        'When girls rise, communities rise with them'
      ],
      reflection: 'Have you ever been treated differently because of your gender? How did it feel? What would a world of true gender equality look like to you?',
      activity: 'Identify one woman leader in your community, school, or country. Research her story and write 3 things you admire about her. Share her story with someone.'
    }
  },
  {
    id: 6, sdg_number: 6, order_index: 6,
    title: 'Clean Water & Sanitation',
    description: 'Ensure availability and sustainable management of water and sanitation for all',
    color: '#26BDE2',
    emoji: '💧',
    content: {
      introduction: 'Water is life. Every person on Earth needs clean water to drink, cook, and stay healthy. Yet 2.2 billion people lack access to safe drinking water, and 4.2 billion lack safe sanitation. In Africa, girls spend up to 6 hours every day collecting water — time stolen from school, play, and rest. SDG 6 calls for clean water and safe sanitation for everyone.',
      sections: [
        {
          heading: 'The Water-Gender Connection',
          body: 'The burden of water collection falls almost entirely on women and girls in Africa. This "water burden" means girls miss school, face dangers walking long distances, and spend their energy on water instead of education and play. When communities get clean water close to home, girls\' school attendance increases dramatically. Clean water = more education opportunities for girls.',
          africa_example: 'In Ethiopia\'s Amhara region, when water points were built within 30 minutes of villages, girls\' school attendance increased by 12% and their grades improved significantly. Women reported having 2-3 extra hours per day for economic activities and rest.'
        },
        {
          heading: 'Sanitation and Menstrual Hygiene',
          body: 'Sanitation means having safe, clean toilets and hygiene facilities. Many schools in Africa lack separate toilets for girls, which is a major reason girls stay home or drop out of school when they start their periods. Every school must have safe, private toilets for girls, clean water for handwashing, and access to menstrual hygiene products.',
          africa_example: 'In Uganda, the "WASH in Schools" program built separate latrines for girls with handwashing stations and provided menstrual hygiene education. In schools with these facilities, girls\' attendance during menstruation increased by 95% and teacher confidence in discussing menstrual health increased 10-fold.'
        },
        {
          heading: 'Water Conservation and Climate',
          body: 'Water is becoming scarcer due to climate change. Lakes are shrinking, rainfall is unpredictable, and droughts are more frequent. Conserving water — using only what you need, collecting rainwater, and protecting water sources from pollution — is essential for future generations. Girls who understand water conservation become community leaders in water management.',
          africa_example: 'In Kenya, youth groups including many teenage girls have helped restore Lake Baringo by planting trees along the lakeshore, removing invasive plants, and educating communities about water conservation. The lake level has risen measurably since the program began.'
        }
      ],
      inspiring_story: {
        name: 'Tasmin Ousman',
        country: 'Somalia/Kenya',
        story: 'Tasmin grew up in a refugee camp where water was rationed to 5 liters per person per day. She watched her mother and sisters walk dangerous paths to reach water. At 16, Tasmin designed a simple rainwater harvesting system using plastic bottles and pipes from discarded materials. Her system collected 200 liters per rainfall and she shared the design with 50 other families.',
        achievement: 'UNICEF Young Innovator Award for water solutions'
      },
      key_takeaways: [
        'Access to clean water is a human right, not a luxury',
        'The water burden falls mostly on women and girls',
        'Proper school sanitation keeps girls in school',
        'Water conservation protects future generations',
        'Girls can and should lead water solutions in their communities'
      ],
      reflection: 'How much time do you or women in your family spend on water-related tasks? How could that time be better used if clean water was easily accessible?',
      activity: 'For one week, track how much water you use daily (drinking, cooking, washing). Calculate how much a family of 5 uses. Research one simple water conservation technique and try it.'
    }
  },
  {
    id: 7, sdg_number: 7, order_index: 7,
    title: 'Affordable & Clean Energy',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
    color: '#FCC30B',
    emoji: '⚡',
    content: {
      introduction: 'Energy powers our world — it lights homes, runs schools and hospitals, enables businesses, and connects communities. But 759 million people still lack access to electricity, and 2.6 billion cook with wood, charcoal, or coal that pollutes the air. SDG 7 calls for clean, affordable energy for everyone. In Africa, clean energy can transform lives — especially for girls and women who are most affected by energy poverty.',
      sections: [
        {
          heading: 'Energy Poverty and Its Impact on Girls',
          body: 'Without electricity, girls cannot study after dark, healthcare centers cannot store vaccines, and businesses cannot operate. Many girls in rural Africa do homework by candlelight or kerosene lamp — which is both dangerous and expensive. Indoor air pollution from cooking fires causes 4 million deaths annually, mostly women and children who spend time near cooking fires.',
          africa_example: 'In Tanzania, when solar panels were installed in rural schools, students could study for 3-4 extra hours in the evenings. Girls\' exam scores improved by an average of 22% because they could study after doing household chores rather than choosing between chores and studying during daylight.'
        },
        {
          heading: 'Solar Power: Africa\'s Energy Revolution',
          body: 'Africa has more sunshine than almost any other continent — a massive resource for solar energy. Solar panels are becoming affordable and are already transforming communities. Solar home systems, solar water pumps, and solar-powered schools and clinics are changing lives across the continent. African girls who learn about solar technology are pioneers in the clean energy revolution.',
          africa_example: 'In Rwanda, the government\'s goal to achieve universal electricity access by 2024 has focused heavily on solar energy. The "Scaling Solar" program has reduced electricity prices and brought power to hundreds of villages. Rwanda now generates 52% of its electricity from renewable sources.'
        },
        {
          heading: 'Girls as Energy Leaders',
          body: 'Women and girls are key to clean energy adoption. Studies show that women are more likely to invest in solar systems, LED lights, and clean cookstoves when they understand the benefits. Girls who learn about renewable energy — solar, wind, hydroelectric, and biogas — can become technicians, engineers, and entrepreneurs driving Africa\'s clean energy future.',
          africa_example: 'In Kenya, Barefoot College has trained rural women from 10 African countries as "Solar Mamas" — solar engineers who go home and electrify their villages. These women, many of whom cannot read, have brought solar power to thousands of homes using skills they learned in 6-month training programs.'
        }
      ],
      inspiring_story: {
        name: 'Chibeze Ezekiel',
        country: 'Ghana',
        story: 'As a teenager, Chibeze watched her community struggle with unreliable electricity. She learned that a coal power plant was planned near her town. Instead of accepting this, she organized her school\'s environmental club and started a petition. She worked with communities, churches, and media to push for solar energy instead. Her campaign helped stop the coal plant and redirect funds to solar projects in her region.',
        achievement: 'Goldman Environmental Prize 2020 — youngest ever African recipient'
      },
      key_takeaways: [
        'Energy access transforms education, health, and economic opportunity',
        'Africa has massive solar energy potential waiting to be harnessed',
        'Indoor air pollution from cooking fires kills millions — clean energy saves lives',
        'Girls and women must be included in energy solutions',
        'Clean energy is both good for people and good for the planet'
      ],
      reflection: 'How does electricity — or lack of it — affect your daily life and studies? What would change for you if your community had 24-hour reliable clean electricity?',
      activity: 'Calculate your household\'s energy use for one day. List all the things that use energy. Identify 3 ways your family could reduce energy use or shift to cleaner options.'
    }
  },
  {
    id: 8, sdg_number: 8, order_index: 8,
    title: 'Decent Work & Economic Growth',
    description: 'Promote sustained, inclusive and sustainable economic growth and decent work for all',
    color: '#A21942',
    emoji: '💼',
    content: {
      introduction: 'Economic growth and decent work mean that everyone can find meaningful, fairly-paid employment in safe conditions. SDG 8 calls for economies to grow in ways that create jobs, protect workers, and lift people out of poverty. For African girls and women, accessing economic opportunities — education, skills training, entrepreneurship, and fair employment — is key to breaking cycles of poverty and dependence.',
      sections: [
        {
          heading: 'The Gender Gap in Africa\'s Economy',
          body: 'Women in Africa work incredibly hard — in homes, farms, and markets. Yet women earn significantly less than men, own fewer businesses, have less access to bank accounts and loans, and are underrepresented in formal employment. Closing this gender economic gap could add trillions of dollars to African economies. Every barrier removed for women and girls creates economic growth for everyone.',
          africa_example: 'In Ethiopia, the "Women Entrepreneurship Development Project" provided 53,000 women with business training, access to credit, and market connections. These women started businesses that collectively generated $190 million in revenue and created 80,000 jobs — proving that investing in women is investing in economies.'
        },
        {
          heading: 'Skills for the Modern Economy',
          body: 'The world of work is changing rapidly. Traditional jobs are being replaced by digital and technology roles. Girls who develop skills in digital literacy, coding, data analysis, marketing, financial management, and entrepreneurship are prepared for the jobs of tomorrow. Vocational skills — tailoring, catering, beauty, healthcare — also provide stable income and economic independence.',
          africa_example: 'In Nigeria, the "Digital Jobs Africa" initiative has trained over 1 million young people including many women in digital skills including graphic design, social media marketing, and freelancing. Many women now earn income from international clients while working from home, sidestepping some traditional gender barriers.'
        },
        {
          heading: 'Entrepreneurship: Be Your Own Boss',
          body: 'Entrepreneurship — starting and running your own business — is a powerful path to economic empowerment for African girls and women. When women control their own income, they invest it in their families\' education, health, and well-being at higher rates than men. Africa has some of the highest rates of female entrepreneurship in the world, but women entrepreneurs still face barriers in accessing capital, markets, and business networks.',
          africa_example: 'Aliko Dangote, Africa\'s richest person, started as a trader. But many don\'t know about women like Folorunso Alakija, one of Africa\'s wealthiest women, who started as a fashion designer before building a multi-billion dollar oil business. Countless African women run businesses — from market stalls to tech startups — creating jobs and economic value.'
        }
      ],
      inspiring_story: {
        name: 'Rebecca Enonchong',
        country: 'Cameroon',
        story: 'Rebecca grew up in Cameroon dreaming of technology. Against skeptics who said tech was for men, she studied computer science and moved to the US. She then returned to Africa to found AppsTech, a software company operating across 50 countries. Rebecca is now one of Africa\'s most influential tech entrepreneurs and champions opportunities for African girls in technology.',
        achievement: 'CEO of AppsTech, Forbes Most Powerful Women in Africa'
      },
      key_takeaways: [
        'Women\'s economic participation grows entire economies',
        'Digital and entrepreneurship skills open new economic doors for girls',
        'Access to credit and markets is crucial for women entrepreneurs',
        'Decent work means fair pay, safe conditions, and equal opportunities',
        'African women entrepreneurs are driving innovation and job creation'
      ],
      reflection: 'What skills do you have that could become a business or career? Who in your community could you learn entrepreneurship from?',
      activity: 'Design your dream business: What product or service would you sell? Who are your customers? What would you need to start? Create a simple one-page business idea.'
    }
  },
  {
    id: 9, sdg_number: 9, order_index: 9,
    title: 'Industry, Innovation & Infrastructure',
    description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization',
    color: '#FD6925',
    emoji: '🏗️',
    content: {
      introduction: 'Infrastructure means the basic systems that make societies work — roads, bridges, electricity grids, internet connections, railways, and buildings. Innovation means developing new ideas, technologies, and solutions. SDG 9 calls for building strong, sustainable infrastructure and promoting innovation that is inclusive — meaning everyone, including girls and rural communities, benefits from it.',
      sections: [
        {
          heading: 'Africa\'s Infrastructure Gap',
          body: 'Africa faces significant infrastructure challenges. Many areas lack reliable roads, making it hard to transport goods or access services. Power outages are common. Internet access is uneven — most concentrated in cities. Poor infrastructure limits economic growth, access to education and healthcare, and the ability to compete in global markets. But infrastructure investment also creates enormous opportunities for young Africans.',
          africa_example: 'The LAPSSET corridor project in East Africa is building roads, railways, and pipelines connecting Kenya, Ethiopia, and South Sudan. Young engineers and construction workers — including women — are gaining valuable skills. The project will open new markets for millions of farmers and businesses along the route.'
        },
        {
          heading: 'Technology and Innovation for African Challenges',
          body: 'African innovators are developing homegrown solutions to African problems. Mobile technology, for example, has transformed banking, healthcare, and agriculture across the continent without traditional infrastructure. Young African girls who understand technology can develop apps, systems, and innovations that solve real challenges in their communities — and potentially sell them to the world.',
          africa_example: 'M-Pesa in Kenya, invented by Africans for Africans, allows people to send and receive money via simple mobile phones without bank accounts. Over 50 million people use it across Africa. It has enabled microbusiness growth, school fee payments, and emergency fund transfers, particularly benefiting women in rural areas.'
        },
        {
          heading: 'Girls in STEM: Building Africa\'s Future',
          body: 'Science, Technology, Engineering, and Mathematics (STEM) are at the heart of innovation. Africa needs millions more engineers, computer scientists, and researchers to build the infrastructure and innovations of the future. Girls who pursue STEM education are not just building careers — they are building Africa. Diverse teams including women consistently produce more creative and effective innovations.',
          africa_example: 'The iHub innovation space in Nairobi has supported hundreds of tech startups, many led by women. Innovations from African women include Ushahidi (crisis mapping platform), mFarmer (agricultural information for farmers), and BrightGrow (LED lighting for indoor farming) — all solving real African problems.'
        }
      ],
      inspiring_story: {
        name: 'Muneera Al-Dosari',
        country: 'Egypt/Africa',
        story: 'Growing up in a community with frequent internet outages, Muneera saw how this hurt students\' ability to learn. At 17, she built a simple offline learning system using Raspberry Pi computers and second-hand equipment. Her system allowed students to access educational videos and textbooks without internet. She won an international STEM competition and her system is now used in 30 schools.',
        achievement: 'UNESCO Youth Science Prize, Engineering Without Borders Award'
      },
      key_takeaways: [
        'Strong infrastructure enables education, health, and economic growth',
        'Africa\'s mobile technology shows how innovation can leapfrog traditional infrastructure',
        'Girls in STEM are crucial to solving Africa\'s infrastructure challenges',
        'Local innovation that solves local problems is as valuable as any global technology',
        'Building infrastructure creates jobs and opportunities for communities'
      ],
      reflection: 'What infrastructure challenge affects your daily life most? School roads, electricity, internet? How might technology or innovation help solve it?',
      activity: 'Identify a problem in your community. Design a simple innovation (tech or non-tech) that could help solve it. Draw or describe your idea and how it would work.'
    }
  },
  {
    id: 10, sdg_number: 10, order_index: 10,
    title: 'Reduced Inequalities',
    description: 'Reduce inequality within and among countries',
    color: '#DD1367',
    emoji: '🤲',
    content: {
      introduction: 'Inequality means that some people have far more power, wealth, and opportunity than others — and those differences are unfair and avoidable. SDG 10 calls for reducing inequality within countries (between rich and poor) and between countries (between wealthy nations and developing nations). For African girls, inequality shows up in multiple ways: gender, wealth, location, disability, and race. Understanding and fighting inequality is essential for a just world.',
      sections: [
        {
          heading: 'Types of Inequality That Affect Girls',
          body: 'Girls in Africa face overlapping inequalities. A girl who is poor, lives in a rural area, has a disability, or belongs to a marginalized community faces many more barriers than a wealthy urban girl. This is called "intersectionality" — when multiple forms of disadvantage combine. Understanding this helps us design solutions that reach the most vulnerable girls and ensure no one is left behind.',
          africa_example: 'In South Africa, girls with disabilities are 10 times less likely to attend school than non-disabled peers. Organizations like "Disabled Children\'s Action Group" advocate specifically for disabled girls, ensuring schools are accessible, sign language interpreters are available, and curricula include all learners.'
        },
        {
          heading: 'Economic Inequality and Social Mobility',
          body: 'Economic inequality means that wealth is concentrated in the hands of a few, while many struggle with poverty. Social mobility means the ability to improve your economic situation through hard work, education, and opportunity. For this to be possible, systems must be fair — equal access to quality education, healthcare, legal protection, and financial services. Inequality is not just unfair; it makes everyone worse off.',
          africa_example: 'The M-Shule platform in Kenya provides personalized education via SMS to rural students who cannot afford private tutors. Students using M-Shule perform significantly better in national exams, demonstrating that technology can help level the education playing field between rich and poor students.'
        },
        {
          heading: 'Speaking Up Against Discrimination',
          body: 'Discrimination means treating people unfairly because of characteristics like gender, race, ethnicity, religion, disability, or economic status. Every person has the right to be treated with dignity and respect. Standing up against discrimination — in your school, community, and country — is an act of courage that builds more equal societies. Every girl who speaks out is a champion for SDG 10.',
          africa_example: 'Youth activists across Africa have used social media platforms like Twitter and TikTok to expose discrimination, amplify marginalized voices, and organize for change. The #EndSARS movement in Nigeria, led largely by young people, showed how digital advocacy can challenge inequality and hold systems accountable.'
        }
      ],
      inspiring_story: {
        name: 'Hindou Oumarou Ibrahim',
        country: 'Chad',
        story: 'Hindou belongs to the Mbororo pastoral community, an indigenous group in Chad. She grew up experiencing inequality — as a girl, as an indigenous person, and as someone from a nomadic community dismissed by society. Instead of accepting this, she became an environmental activist representing indigenous peoples at the United Nations. Today she advocates for equal representation of marginalized communities in climate decisions.',
        achievement: 'UN Environment Programme Champion of the Earth, Forbes 30 Under 30'
      },
      key_takeaways: [
        'Inequality is unfair and avoidable — it can and must be changed',
        'Girls face overlapping inequalities that must all be addressed',
        'Access to education and economic opportunity reduces inequality',
        'Speaking up against discrimination builds more equal communities',
        'Every person deserves equal dignity, rights, and opportunities'
      ],
      reflection: 'What forms of inequality do you witness in your school or community? How does it affect people? What small action could you take to challenge one form of inequality?',
      activity: 'Map the inequalities in your community — create a list of 5 groups who face disadvantage. For each, write one action that could help reduce that inequality.'
    }
  },
  {
    id: 11, sdg_number: 11, order_index: 11,
    title: 'Sustainable Cities & Communities',
    description: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
    color: '#FD9D24',
    emoji: '🏙️',
    content: {
      introduction: 'More than half of the world\'s people now live in cities, and by 2050 it will be two-thirds. Africa is urbanizing faster than any other continent. SDG 11 calls for cities that are safe, inclusive, resilient, and sustainable — places where everyone, including girls and women, can live, work, and thrive. Sustainable communities are not just about buildings — they\'re about systems, culture, and the quality of life they provide.',
      sections: [
        {
          heading: 'Urban Safety for Girls and Women',
          body: 'Cities offer opportunities — schools, jobs, services — but they also present dangers for girls and women. Harassment on public transport, unsafe neighborhoods, poorly lit streets, and violence are daily realities for many urban women and girls. Safe cities for women require adequate street lighting, public transportation that is safe and affordable, reporting systems for harassment, and community watch programs.',
          africa_example: 'In Nairobi\'s Kibera slum, the "Safe Cities" UN Women program worked with young women to map unsafe areas using smartphones. They created a community safety map showing danger zones, which was used to improve street lighting, create safe spaces, and design better transport routes. Youth girl leaders continue to monitor and update the map.'
        },
        {
          heading: 'Slums and Urban Inequality',
          body: 'Africa\'s rapidly growing cities struggle to provide housing, water, sanitation, and services for all residents. An estimated 60% of urban Africans live in informal settlements (slums) with overcrowding, poor sanitation, and limited services. Yet slum communities are creative, resilient, and full of youth energy. Girls in slums are leaders, innovators, and advocates for their communities.',
          africa_example: 'In Accra, Ghana, a teenage girl named Leticia Quaye founded "Clean Up Accra" after her neighborhood flooded because drains were blocked by trash. She mobilized 500 young people to clean drains and started a recycling program. The initiative has prevented flooding in her neighborhood and been adopted by the city government.'
        },
        {
          heading: 'Green and Sustainable Cities',
          body: 'Sustainable cities protect green spaces, reduce pollution, use clean energy, manage waste responsibly, and are designed for people — not just cars. As Africa builds new cities and upgrades existing ones, incorporating sustainability from the start is crucial. Girls who understand urban planning and sustainability can shape the cities of tomorrow to be livable, beautiful, and fair for all residents.',
          africa_example: 'Kigali, Rwanda, has become one of Africa\'s cleanest cities through "Umuganda" — monthly community clean-up days where all citizens participate. The city bans single-use plastics, has extensive green spaces, and is developing a master plan for sustainable urban growth. Kigali shows that African cities can be world leaders in sustainability.'
        }
      ],
      inspiring_story: {
        name: 'Vanessa Nakate',
        country: 'Uganda',
        story: 'Growing up in Kampala, Uganda, Vanessa witnessed flooding, drought, and extreme heat that disrupted her city. She became a climate activist at 22, organizing "Friday for Future" strikes in Uganda when the movement was mostly known in Europe. Despite being cropped out of a major international photo featuring only white activists — highlighting inequality even within activism — she continued her work. Today she is one of Africa\'s most recognized climate voices.',
        achievement: 'UNICEF Ambassador, TIME Magazine Next Generation Leader'
      },
      key_takeaways: [
        'Sustainable cities must be safe and inclusive for girls and women',
        'Urban slums are communities of resilience, not just poverty',
        'Youth and girls can lead community sustainability initiatives',
        'African cities must grow in ways that are green and equitable',
        'Everyone deserves to live in a safe, clean, and dignified community'
      ],
      reflection: 'Is your community or city safe for girls? What makes it safe or unsafe? What one change would make it better for girls and women?',
      activity: 'Conduct a "Safety Walk" of your school or neighborhood. Note what feels safe and unsafe for girls. Create a simple map and list 3 recommendations for improvement.'
    }
  },
  {
    id: 12, sdg_number: 12, order_index: 12,
    title: 'Responsible Consumption & Production',
    description: 'Ensure sustainable consumption and production patterns',
    color: '#BF8B2E',
    emoji: '♻️',
    content: {
      introduction: 'We are consuming the Earth\'s resources faster than they can be replaced. If everyone lived like the average person in a wealthy country, we would need 3 planets to sustain us. SDG 12 calls for changing how we produce goods and how we consume them — using less, wasting less, choosing sustainable products, and producing things in ways that don\'t destroy the environment. As consumers, girls and women have significant power to drive sustainable change.',
      sections: [
        {
          heading: 'Fast Fashion and Environmental Cost',
          body: 'The fashion industry is one of the world\'s largest polluters. "Fast fashion" — cheap clothes made quickly and discarded after a few uses — creates enormous waste and often exploits workers (many of them women and girls) in poor working conditions. Choosing quality over quantity, buying second-hand, repairing clothes, and supporting ethical African fashion brands are powerful choices girls can make.',
          africa_example: 'In Ghana, the "Kantamanto Market" in Accra receives 15 million used clothing items every week from wealthy countries. The "Or Foundation" works with market women and young people to document and reduce this "fashion waste" problem, advocating for wealthy countries to take responsibility for their clothing waste.'
        },
        {
          heading: 'Food Waste: A Global Problem With Local Solutions',
          body: 'About one-third of all food produced globally is wasted — while hundreds of millions go hungry. In Africa, most food waste happens during storage and transport (due to lack of refrigeration and poor roads) rather than in households. Reducing food waste requires better storage technologies, improved transport, and consumer awareness. Girls who understand food systems can innovate and advocate for solutions.',
          africa_example: 'Freshbox, a Zimbabwean startup founded by young women, developed an affordable evaporative cooler made from clay pots that keeps vegetables fresh for 2 weeks without electricity. This simple innovation reduced food waste by up to 80% for market women who now need fewer trips to market and waste far less produce.'
        },
        {
          heading: 'Circular Economy: Design Out Waste',
          body: 'A circular economy is one where products are designed to be reused, repaired, or recycled rather than thrown away. This reduces waste and keeps resources in use for longer. African entrepreneurs are leaders in circular economy innovations — turning waste into valuable products. Girls who understand circular economy principles can develop businesses that are both profitable and planet-friendly.',
          africa_example: 'In Kenya, "Mr. Green Africa" collects plastic waste from communities and converts it into raw materials for manufacturers, while paying waste pickers — many of them women — fairly for their work. The company has diverted thousands of tonnes of plastic from oceans and landfills while creating dignified employment.'
        }
      ],
      inspiring_story: {
        name: 'Yvette Ishimwe',
        country: 'Rwanda',
        story: 'Yvette was inspired by Rwanda\'s plastic bag ban — the world\'s most comprehensive. She saw an opportunity to create fashionable bags from recycled materials. At 17, she started "EcoFashion Rwanda" from her bedroom, collecting discarded materials from local businesses and hand-making bags and accessories. Her products are now sold in hotels across Kigali, and she employs 12 women from her neighborhood.',
        achievement: 'Young Entrepreneur of the Year, East African Business Awards'
      },
      key_takeaways: [
        'We must consume less and waste less to protect the planet',
        'Girls and women as consumers have real power to drive change',
        'Circular economy businesses can be both profitable and sustainable',
        'Food waste is a solvable problem with innovative African solutions',
        'Ethical fashion choices support fair working conditions for women'
      ],
      reflection: 'Look around your home. How much do you buy that you don\'t really need? How much food does your family waste? What one consumption habit could you change?',
      activity: 'For one week, keep a "consumption diary." Track everything you buy or use. At the end, identify 3 things you consumed unnecessarily and 3 ways you could reduce waste.'
    }
  },
  {
    id: 13, sdg_number: 13, order_index: 13,
    title: 'Climate Action',
    description: 'Take urgent action to combat climate change and its impacts',
    color: '#3F7E44',
    emoji: '🌍',
    content: {
      introduction: 'Climate change is the defining challenge of our generation. The Earth is warming due to greenhouse gases released by burning fossil fuels, deforestation, and industrial activities. This is causing more extreme weather — droughts, floods, storms, and heatwaves — that threatens food, water, health, and livelihoods. Africa is one of the regions most affected by climate change, despite contributing least to it. Girls and young people are leading the fight for climate justice.',
      sections: [
        {
          heading: 'How Climate Change Affects African Girls',
          body: 'Climate change hits women and girls hardest. When droughts reduce harvests, girls are first to be pulled out of school to fetch water or earn money. When floods destroy homes, girls face increased risks of violence in displacement camps. When heat makes farming harder, women who grow most of Africa\'s food bear the burden. Climate justice — addressing climate change fairly — must center women and girls.',
          africa_example: 'In Malawi, 2019\'s Cyclone Idai destroyed 90% of crops in some areas, forcing thousands of families into food insecurity. Studies showed that girls in affected areas were twice as likely to be married early as families desperately sought economic solutions. Climate change directly drives child marriage in climate-vulnerable communities.'
        },
        {
          heading: 'Africa\'s Forests and Carbon',
          body: 'Forests are Earth\'s lungs — they absorb carbon dioxide and produce oxygen. Africa\'s Congo Basin is the world\'s second-largest rainforest and a critical carbon sink. But deforestation for agriculture, charcoal, and mining is destroying these forests rapidly. Protecting and restoring Africa\'s forests is one of the most powerful climate solutions available — and African youth are leading reforestation efforts.',
          africa_example: 'Ethiopia planted 350 million trees in a single day in 2019 — a world record — as part of the "Green Legacy" initiative. Young people and students were central to this effort. The campaign has now planted over 20 billion trees across the country, restoring degraded land and combating desertification.'
        },
        {
          heading: 'Youth Climate Activism in Africa',
          body: 'Young Africans are leading powerful climate movements. From school strikes to courtroom battles, from tree-planting campaigns to policy advocacy, African youth are demanding urgent climate action. Girls are especially prominent in African climate activism, connecting the fight against climate change to the fight for gender equality and social justice.',
          africa_example: 'Fridays for Future Africa, co-founded by activists including Vanessa Nakate (Uganda), Hilda Flavia Nakabuye (Uganda), and Ayisha Siddiqa (Pakistan/global), has organized climate strikes in over 25 African countries, demanding that wealthy nations stop burning fossil fuels and pay for climate damages they have caused to Africa.'
        }
      ],
      inspiring_story: {
        name: 'Hilda Flavia Nakabuye',
        country: 'Uganda',
        story: 'Hilda started striking for climate every Friday outside Uganda\'s parliament at age 22 — often alone. She has faced online harassment, dismissal from adults, and the challenge of climate activism in a country where people are struggling with immediate poverty. But she continued, connecting the dots between climate change, food insecurity, and girls\'s rights. Today she is one of the most recognized young climate leaders in Africa.',
        achievement: 'Global Greengrants Fund Award, United Nations Climate Summit Speaker'
      },
      key_takeaways: [
        'Climate change is the biggest threat facing our generation',
        'Africa is most affected despite contributing least to climate change',
        'Girls and women bear the heaviest burden of climate impacts',
        'African youth are leading powerful climate action',
        'Protecting forests and transitioning to clean energy are urgent priorities'
      ],
      reflection: 'How has climate change affected your community? What weather changes have you noticed in your lifetime? What can you personally do to reduce your carbon footprint?',
      activity: 'Calculate your "carbon footprint" (there are free online calculators). Identify your top 3 sources of emissions. Create a personal "climate action plan" with 3 specific steps to reduce your impact.'
    }
  },
  {
    id: 14, sdg_number: 14, order_index: 14,
    title: 'Life Below Water',
    description: 'Conserve and sustainably use the oceans, seas and marine resources',
    color: '#0A97D9',
    emoji: '🌊',
    content: {
      introduction: 'Our oceans cover 71% of the Earth\'s surface and are home to extraordinary biodiversity. They regulate our climate, produce half of the world\'s oxygen, and provide food and livelihoods for billions of people — especially in coastal Africa. But oceans are in crisis: plastic pollution, overfishing, rising temperatures, and acidification threaten marine ecosystems. SDG 14 calls for protecting life below water for future generations.',
      sections: [
        {
          heading: 'African Coastal Communities and Ocean Livelihoods',
          body: 'Millions of Africans along the coast depend on healthy oceans for food and income. Women in coastal communities often control fish processing, drying, and marketing — making them key players in the "blue economy." When oceans are healthy, these women thrive. When oceans are overfished or polluted, women and girls lose their economic base and food security is threatened.',
          africa_example: 'In Ghana, women "fish processors" (called "fante" traders) have worked for generations transforming fresh catch into smoked and dried fish sold across West Africa. As fish stocks decline due to overfishing by large commercial vessels, these women have lost income and advocated for better fishing regulations to protect their traditional livelihoods.'
        },
        {
          heading: 'Plastic Pollution: A Crisis We Can Solve',
          body: 'Approximately 8 million tonnes of plastic enter the ocean every year. Africa\'s rivers — especially in West and East Africa — carry significant plastic waste to the sea. Plastic harms marine animals who eat or get entangled in it, and eventually enters our food chain as microplastics. Reducing plastic use, improving waste management, and cleaning up coastlines are actions that individuals and communities can take right now.',
          africa_example: 'The "Clean Ocean Campaign" in Senegal has mobilized fishing communities, schools, and local governments to clean up beaches and rivers, reduce single-use plastics, and create employment in recycling. Young girls have been trained as "Ocean Ambassadors" who educate their peers and families about plastic pollution.'
        },
        {
          heading: 'Marine Protected Areas and Sustainable Fishing',
          body: 'Marine Protected Areas (MPAs) are zones where fishing and development are restricted, allowing marine ecosystems to recover. Sustainable fishing means catching fish at rates that allow populations to replenish. Communities that manage their fishing sustainably often see fish stocks increase dramatically, improving their food security and income in the long run.',
          africa_example: 'In Kenya\'s Mombasa Marine National Park, communities that once overfished now participate in managing the marine reserve. Fish populations inside the park have recovered significantly, and tourism revenues from snorkeling and diving have created new income sources for local women and youth.'
        }
      ],
      inspiring_story: {
        name: 'Titilope Ngozi Adewale',
        country: 'Nigeria',
        story: 'Growing up on the Nigerian coast, Titilope watched mangrove forests disappear due to oil pollution and development. At university she studied marine ecology and returned home to start a mangrove restoration project. Working with local fishing women, her team has replanted over 100 hectares of mangroves — protecting coastlines from erosion, restoring fish habitats, and creating community carbon income.',
        achievement: 'Niger Delta Environmental Champion, Goldman Environmental Prize nominee'
      },
      key_takeaways: [
        'Healthy oceans provide food, oxygen, and climate regulation for all life',
        'Women in coastal communities are guardians of blue economy livelihoods',
        'Plastic pollution is a crisis requiring urgent individual and collective action',
        'Marine protected areas allow ocean ecosystems to recover and thrive',
        'Girls can be ocean guardians and blue economy leaders'
      ],
      reflection: 'Do you live near a river, lake, or ocean? Have you noticed changes in water quality or marine life? What actions can your community take to protect water bodies?',
      activity: 'Organize a "Plastic Audit" — spend 30 minutes collecting and categorizing all plastic waste in your school yard or a local area. Record what you find and share the results with your school administration with recommendations.'
    }
  },
  {
    id: 15, sdg_number: 15, order_index: 15,
    title: 'Life on Land',
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems',
    color: '#56C02B',
    emoji: '🌳',
    content: {
      introduction: 'Earth\'s land ecosystems — forests, grasslands, wetlands, and deserts — support all life on our planet. They regulate water cycles, clean the air, store carbon, and provide food, medicine, and materials for billions of people. But land degradation, deforestation, and biodiversity loss are occurring at alarming rates. SDG 15 calls for protecting life on land, restoring degraded ecosystems, and halting biodiversity loss.',
      sections: [
        {
          heading: 'Africa\'s Extraordinary Biodiversity',
          body: 'Africa is home to extraordinary biodiversity — more megafauna (large animals) than any other continent, vast forests, unique grasslands (savannas), and millions of plant species, many found nowhere else on Earth. This biodiversity is not just beautiful — it provides medicines, food, and ecosystem services that humans depend on. Protecting it is protecting our future.',
          africa_example: 'The Virunga National Park in the Democratic Republic of Congo is one of the world\'s most biodiverse areas and home to critically endangered mountain gorillas. Despite devastating conflict, local rangers — including women rangers — have continued to protect the park. Wildlife tourism has provided alternative income for communities that once relied on poaching.'
        },
        {
          heading: 'Deforestation and Land Degradation',
          body: 'Africa loses approximately 3.4 million hectares of forest every year — more than any other continent. Causes include charcoal production for cooking fuel, agricultural expansion, logging, and mining. Land degradation reduces soil fertility, increases flooding, drives drought, and destroys habitats. The people who depend most directly on land — small-scale farmers, many of them women — suffer most when land degrades.',
          africa_example: 'In Burkina Faso, the ancient "zaï" technique — hand-digging small planting pits and filling them with organic material — has been used by farmers, especially women, to restore degraded land. This indigenous knowledge has transformed barren areas into productive farmland, improving food security for tens of thousands of families.'
        },
        {
          heading: 'Girls as Guardians of Nature',
          body: 'Girls and women have always been guardians of the land — as farmers, herbalists, water collectors, and community members with deep knowledge of local ecosystems. When girls and women are empowered to lead land restoration and conservation efforts, they bring unique perspectives, indigenous knowledge, and commitment. Environmental stewardship by girls is a powerful force for SDG 15.',
          africa_example: 'The Green Belt Movement, founded by Nobel Prize winner Wangari Maathai, has planted over 51 million trees across Kenya by empowering rural women and girls. These trees have reduced erosion, restored water catchments, provided firewood sustainably, and given women economic income from tree nurseries.'
        }
      ],
      inspiring_story: {
        name: 'Leah Namugerwa',
        country: 'Uganda',
        story: 'Leah started planting trees for her 15th birthday instead of receiving gifts. Her "trees for birthday" campaign inspired thousands of Ugandan youth to plant trees instead of celebrating with gifts. By 18, her campaign had planted over 100,000 trees across Uganda. She also advocates for banning plastic bags, which she sees as connected to forest destruction when they clog drainage and kill trees.',
        achievement: 'Fridays for Future Uganda, planting 100,000+ trees across Uganda'
      },
      key_takeaways: [
        'Africa\'s biodiversity is a global treasure that must be protected',
        'Deforestation drives climate change, floods, and food insecurity',
        'Indigenous land management knowledge is valuable and must be preserved',
        'Girls and women are essential partners in land conservation',
        'Restoring degraded land benefits entire communities and ecosystems'
      ],
      reflection: 'What natural spaces exist in your community — parks, forests, rivers, wetlands? How are they being protected or threatened? What can young people do to protect them?',
      activity: 'Start or join a tree-planting initiative. Research which trees are native to your area, find or create a planting site (school yard, community land), and plant at least 3 trees. Track their growth over the coming months.'
    }
  },
  {
    id: 16, sdg_number: 16, order_index: 16,
    title: 'Peace, Justice & Strong Institutions',
    description: 'Promote peaceful and inclusive societies for sustainable development',
    color: '#00689D',
    emoji: '⚖️',
    content: {
      introduction: 'Without peace, justice, and strong institutions, no other SDG can be achieved. Conflict destroys schools, hospitals, and communities. Corruption wastes resources that should go to education and health. Weak justice systems fail to protect girls from violence and discrimination. SDG 16 calls for peaceful societies, access to justice for all, and effective, accountable institutions — the foundation on which all other development is built.',
      sections: [
        {
          heading: 'Conflict and Its Impact on Girls',
          body: 'Armed conflict has devastating effects on girls and women. Schools are destroyed or closed. Girls face violence, including sexual violence used as a weapon of war. Child marriage rates spike as families try to "protect" daughters or earn money. And when peace comes, girls\' needs are often overlooked in reconstruction. Despite this, women and girls are powerful peacebuilders and deserve seats at every peace negotiation table.',
          africa_example: 'In Liberia, during a devastating civil war, a group of Christian and Muslim women organized by Leymah Gbowee held peace vigils, staged protests, and ultimately confronted warring warlords. Their nonviolent movement — the Women of Liberia Mass Action for Peace — helped end the civil war in 2003. Leymah Gbowee won the Nobel Peace Prize in 2011.'
        },
        {
          heading: 'Corruption and What Girls Can Do',
          body: 'Corruption — dishonest use of power for personal gain — diverts money from schools, clinics, and services to private pockets. It means that girls who deserve scholarships don\'t get them, that school buildings that should be built aren\'t, and that policies that should protect girls aren\'t enforced. Fighting corruption requires transparency, accountability, and young people who refuse to accept it as "just the way things are."',
          africa_example: 'In Uganda, teenagers at a rural school reported to a government transparency hotline that their school\'s feeding program money was being stolen by administrators. Their report triggered an investigation that recovered stolen funds and led to the dismissal of corrupt officials. Young people can and do fight corruption.'
        },
        {
          heading: 'Civic Rights and Youth Participation',
          body: 'Civic rights — the right to vote, to free speech, to a fair trial, to peaceful protest — protect all citizens. Young people are citizens too, and their voices matter in politics and governance. Girls who understand civic rights can advocate for policies that protect themselves and their communities. Youth civic education — learning how governments work and how to participate in them — is essential for democracy.',
          africa_example: 'In Zambia, the "Young Women in Politics" program has trained hundreds of teenage girls in civic leadership, public speaking, and policy advocacy. Several program graduates have gone on to serve in student government, then national youth advisory councils, building a pipeline of young female leaders for Zambia\'s future.'
        }
      ],
      inspiring_story: {
        name: 'Leymah Gbowee',
        country: 'Liberia',
        story: 'Leymah was a traumatized young mother during Liberia\'s brutal civil war. Rather than giving up hope, she organized women across religious and ethnic lines to demand peace. Her movement\'s tactics — praying, singing, and refusing to return home — helped force warlords to peace negotiations. When talks stalled, the women locked the negotiators inside until they reached agreement. Leymah won the Nobel Peace Prize in 2011 for her extraordinary leadership.',
        achievement: 'Nobel Peace Prize 2011, Founder of Women Peace and Security Network Africa'
      },
      key_takeaways: [
        'Peace and justice are the foundation for all other development goals',
        'Girls and women are essential peacebuilders, not just victims of conflict',
        'Corruption steals from the most vulnerable — fighting it is an act of justice',
        'Civic participation by girls and youth makes democracies stronger',
        'Every girl has the right to justice, safety, and equal protection under law'
      ],
      reflection: 'Do you feel that laws in your country protect girls equally? What is one law or policy you would change to make girls safer and more equal? How would you advocate for that change?',
      activity: 'Research your country\'s constitution or laws related to girls\' rights. Find one law that protects girls and one area where laws fall short. Write a short letter to a local official about the gap you identified.'
    }
  },
  {
    id: 17, sdg_number: 17, order_index: 17,
    title: 'Partnerships for the Goals',
    description: 'Strengthen the means of implementation and revitalize the global partnership',
    color: '#19486A',
    emoji: '🌐',
    content: {
      introduction: 'None of the 17 SDGs can be achieved alone. SDG 17 recognizes that achieving a better world requires partnership — between governments, businesses, civil society organizations, communities, and individuals. These partnerships must cross borders, sectors, and generations. As a Bloom Girl Africa learner, you are already part of a global partnership for change. This final goal celebrates the power of working together.',
      sections: [
        {
          heading: 'What Makes a Powerful Partnership?',
          body: 'Powerful partnerships combine different strengths toward a common goal. A government might provide funding and policy; a business provides technology; a nonprofit organization brings community relationships; and young people bring energy, creativity, and lived experience. Good partnerships are based on mutual respect, shared goals, clear roles, transparency, and accountability. When diverse partners work together, they achieve far more than any one group could alone.',
          africa_example: 'The African Union\'s "Agenda 2063" vision for Africa\'s future is a partnership between 55 African governments, hundreds of civil society organizations, the African private sector, and the African diaspora worldwide. It sets ambitious goals for education, health, gender equality, and prosperity — demonstrating that Africa can design its own development vision rather than depending on external aid.'
        },
        {
          heading: 'Youth as Equal Partners',
          body: 'Young people are often seen as the "future" of development — but they are the present too. The majority of Africa\'s population is under 25, and young people must be equal partners in designing and implementing the SDGs — not just recipients of programs designed for them by adults. Youth-led organizations, youth representation in government, and youth voices in international negotiations are essential for effective SDG implementation.',
          africa_example: 'The African Youth SDGs Summit, held annually and led entirely by young Africans, brings together youth leaders from every African country to share solutions, build partnerships, and advocate to governments. The summit has produced African youth-led commitments that have influenced national development plans in 15 countries.'
        },
        {
          heading: 'Technology and Data for Partnerships',
          body: 'Technology enables partnerships across distances. Social media, video calls, shared digital platforms, and open data allow youth activists in rural Uganda to collaborate with researchers in Ghana, policymakers in Nairobi, and partners in Europe or North America. Girls who are digitally literate can participate in global conversations, access global opportunities, and build partnerships that advance all 17 SDGs.',
          africa_example: 'Bloom Girl Africa itself is an example of SDG 17 in action — a digital platform that connects African girls with global knowledge about the SDGs, building a community of young change-makers who can learn from and support each other across borders. By completing this program, you join a global network of Bloom Girls committed to creating a better Africa and a better world.'
        }
      ],
      inspiring_story: {
        name: 'You — The Bloom Girl',
        country: 'Africa',
        story: 'The most inspiring story of SDG 17 is not yet written — it is yours. You have now studied all 17 Sustainable Development Goals. You understand poverty, hunger, health, education, gender equality, clean water, energy, economic opportunity, innovation, reduced inequality, sustainable cities, responsible consumption, climate action, ocean conservation, land protection, peace, and the power of partnership. You have knowledge that millions of girls your age don\'t yet have. What will you do with it? How will you partner with others to create change? The world is waiting for the Bloom Girls of Africa.',
        achievement: 'Your story of impact starts now — the world is watching'
      },
      key_takeaways: [
        'No SDG can be achieved without partnership across sectors and borders',
        'Young people are equal partners in SDG implementation, not just beneficiaries',
        'Technology enables powerful partnerships across distances and differences',
        'African-designed, African-led partnerships are essential for Africa\'s development',
        'You are now a Bloom Girl — a partner in the global movement for the SDGs'
      ],
      reflection: 'Looking back at all 17 SDGs, which one resonates most with you? Which challenge in your community could you help address using what you\'ve learned? Who could you partner with to make it happen?',
      activity: 'Create your "SDG Action Pledge" — choose ONE SDG that matters most to you, identify ONE specific problem in your community it relates to, name TWO people you will partner with, and list THREE actions you will take in the next 30 days. Share your pledge with someone who will hold you accountable.'
    }
  }
]

export function getModuleById(id: number): SDGModule | undefined {
  return SDG_MODULES.find(m => m.id === id)
}

export function getModuleColor(moduleId: number): string {
  return SDG_MODULES.find(m => m.id === moduleId)?.color || '#7C3AED'
}
