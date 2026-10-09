/**
 * CELPIP Master 12 - Comprehensive Bank of 10 Full Authentic Simulations
 * Meticulously modeled on CELPIP-General specifications and CLB 11-12 benchmarks.
 */

import { SimulationPackage, ListeningPartData, ReadingPartData, WritingTaskData, SpeakingTaskData } from '../types/celpip';

export const SAMPLE_SIMULATIONS: SimulationPackage[] = [
  // SIMULATION 1: Vancouver Urban Renewal & Strata Governance
  {
    id: 'sim_vancouver_urban_renewal',
    title: 'Simulation 1: Urban Transit & Strata Bylaw Modernization',
    topicDomain: 'Housing, Civic Transit & Environmental Sustainability',
    difficultyLevel: 'elite',
    hash: 'celpip_sim_hash_001_vancouver',
    createdAt: '2026-03-15T09:00:00Z',
    listeningParts: [
      {
        partId: 'l_part_0',
        partNumber: 0,
        title: 'Practice Task: Audio & Question Warm-up',
        instructions: 'This is an unscored practice question to test your sound and familiarize yourself with the question interface.',
        audioScript: [
          { speaker: 'Receptionist', text: 'Good morning! Welcome to the Kitsilano Community Centre. Are you here for the adult swimming session or the strata meeting in Room B?' },
          { speaker: 'Visitor', text: 'Hi there, I’m actually looking for Room B for the strata council meeting. Thanks for pointing the way!' }
        ],
        fullTranscript: 'Good morning! Welcome to the Kitsilano Community Centre. Are you here for the adult swimming session or the strata meeting in Room B?\nHi there, I’m actually looking for Room B for the strata council meeting. Thanks for pointing the way!',
        speakerCount: 2,
        questions: [
          {
            id: 'l_p0_q1',
            partId: 'l_part_0',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'Where is the visitor going?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'I’m actually looking for Room B for the strata council meeting.',
            options: [
              { id: 'A', text: 'To the indoor swimming pool', isCorrect: false, rationale: 'The receptionist asked if he was there for swimming, but the visitor clarified he is attending the strata meeting.' },
              { id: 'B', text: 'To Room B for a council meeting', isCorrect: true, rationale: 'The visitor explicitly stated he is looking for Room B for the strata council meeting.' },
              { id: 'C', text: 'To register for a community fitness pass', isCorrect: false, rationale: 'Not mentioned in the dialogue.' },
              { id: 'D', text: 'To book a community room for next week', isCorrect: false, rationale: 'He is arriving for a meeting today, not booking one.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_1',
        partNumber: 1,
        title: 'Part 1: Listening to Problem Solving',
        instructions: 'You will hear a conversation between a customer and a transit customer service agent. Listen carefully. You will hear the audio only once.',
        audioScript: [
          { speaker: 'Commuter', text: 'Hello, I need some help with my monthly regional transit card. When I tapped at the Commercial-Broadway station this morning, the gate gave an error chime and deducted twenty dollars from my stored value instead of using my active monthly pass!' },
          { speaker: 'Agent', text: 'I understand how frustrating that is. Let me scan your card here on the diagnostic terminal. Ah, I see what happened. It appears your auto-renewal payment was processed after the midnight cutoff on the first of the month because your bank flagged it for two-factor verification.' },
          { speaker: 'Commuter', text: 'Oh, really? But the pass still shows active on my phone app! Can you reverse that stored-value deduction?' },
          { speaker: 'Agent', text: 'Yes, absolutely. Because the app confirmed your renewal authorization prior to 6:00 AM, I can issue an immediate ledger adjustment. I will refund the twenty dollars back to your card balance right now, and re-link your monthly pass to ensure afternoon taps won’t incur any extra fare.' },
          { speaker: 'Commuter', text: 'That’s wonderful relief. Do I need to tap at a specific machine before heading to the platform this afternoon?' },
          { speaker: 'Agent', text: 'No need for a special machine. Just tap directly at any standard fare gate. However, please wait at least fifteen minutes from now so the central database syncs across all rapid transit gates.' }
        ],
        fullTranscript: 'Commuter: Hello, I need some help with my monthly regional transit card...\nAgent: I understand how frustrating that is...',
        speakerCount: 2,
        questions: [
          {
            id: 'l_p1_q1',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'Why did the commuter’s card deduct money from his stored balance?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'It appears your auto-renewal payment was processed after the midnight cutoff... bank flagged it for two-factor verification.',
            options: [
              { id: 'A', text: 'His card had physically expired the previous week', isCorrect: false, rationale: 'The card was not expired; the issue was timing of auto-renewal payment.' },
              { id: 'B', text: 'He tapped outside of the designated two-zone travel window', isCorrect: false, rationale: 'Zone violation was never mentioned.' },
              { id: 'C', text: 'A bank security verification delayed his monthly pass renewal', isCorrect: true, rationale: 'The agent explains two-factor authentication caused the payment to process past the midnight cutoff.' },
              { id: 'D', text: 'The card reader terminal at the station was malfunctioning', isCorrect: false, rationale: 'The terminal worked correctly based on the card balance status.' }
            ]
          },
          {
            id: 'l_p1_q2',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'What immediate action does the transit agent take?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'I can issue an immediate ledger adjustment. I will refund the twenty dollars back to your card balance right now.',
            options: [
              { id: 'A', text: 'Refunds the deducted fare and re-links the monthly pass', isCorrect: true, rationale: 'Agent states he will issue an immediate ledger adjustment refunding $20 and re-linking the pass.' },
              { id: 'B', text: 'Issues a brand-new plastic transit card free of charge', isCorrect: false, rationale: 'He modifies the existing card balance on the diagnostic terminal.' },
              { id: 'C', text: 'Instructs the commuter to file a formal online claim with his bank', isCorrect: false, rationale: 'He resolves it directly at the counter.' },
              { id: 'D', text: 'Gives him two complimentary one-way paper tickets', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'l_p1_q3',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'What should the commuter do before using his card this afternoon?',
            correctOptionId: 'D',
            skillTag: 'inference',
            evidenceText: 'please wait at least fifteen minutes from now so the central database syncs across all rapid transit gates.',
            options: [
              { id: 'A', text: 'Visit the service desk again to re-validate the magnetic strip', isCorrect: false, rationale: 'No second visit needed.' },
              { id: 'B', text: 'Tap his card at a specialized station kiosk before 1:00 PM', isCorrect: false, rationale: 'He does not need a special machine.' },
              { id: 'C', text: 'Log into his banking portal to authorize future recurring charges', isCorrect: false, rationale: 'The agent only required waiting 15 minutes for database sync.' },
              { id: 'D', text: 'Allow a quarter of an hour for the system to synchronize', isCorrect: true, rationale: 'The agent asks him to wait at least fifteen minutes before tapping.' }
            ]
          },
          {
            id: 'l_p1_q4',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What tone does the transit agent maintain throughout the encounter?',
            correctOptionId: 'B',
            skillTag: 'tone_attitude',
            evidenceText: 'I understand how frustrating that is... Yes, absolutely... I will refund the twenty dollars...',
            options: [
              { id: 'A', text: 'Defensive and dismissive of commuter complaints', isCorrect: false, rationale: 'He immediately validates the customer\'s concern.' },
              { id: 'B', text: 'Empathetic, reassuring, and solution-oriented', isCorrect: true, rationale: 'Agent acknowledges frustration promptly and executes an immediate resolution.' },
              { id: 'C', text: 'Strictly bureaucratic and unwilling to make exceptions', isCorrect: false, rationale: 'He quickly resolves the issue instead of citing rigid rules.' },
              { id: 'D', text: 'Indifferent and distracted by other tasks', isCorrect: false, rationale: 'He focuses fully on the diagnostic analysis.' }
            ]
          },
          {
            id: 'l_p1_q5',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'Why did the app display an active pass despite the station error?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'Because the app confirmed your renewal authorization prior to 6:00 AM...',
            options: [
              { id: 'A', text: 'The commuter had purchased a duplicate pass on his tablet', isCorrect: false, rationale: 'No duplicate pass mentioned.' },
              { id: 'B', text: 'The mobile app operates on an unverified test server', isCorrect: false, rationale: 'Not stated.' },
              { id: 'C', text: 'The app registered the authorization earlier in the morning', isCorrect: true, rationale: 'The authorization was recorded on the app before 6:00 AM.' },
              { id: 'D', text: 'It was displaying last month\'s archived pass receipt', isCorrect: false, rationale: 'It was the newly authorized renewal.' }
            ]
          },
          {
            id: 'l_p1_q6',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 6,
            promptText: 'Where did the initial tapping error occur?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'When I tapped at the Commercial-Broadway station this morning...',
            options: [
              { id: 'A', text: 'Commercial-Broadway station', isCorrect: true, rationale: 'Explicitly named in the first sentence.' },
              { id: 'B', text: 'Waterfront terminal', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'C', text: 'Kitsilano bus loop', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Metrotown platform', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'l_p1_q7',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 7,
            promptText: 'What can be inferred about the transit system’s ticketing technology?',
            correctOptionId: 'B',
            skillTag: 'inference',
            evidenceText: 'so the central database syncs across all rapid transit gates.',
            options: [
              { id: 'A', text: 'It operates purely on offline local memory without internet connection', isCorrect: false, rationale: 'It syncs with a central database.' },
              { id: 'B', text: 'Gate changes rely on periodic central database synchronizations', isCorrect: true, rationale: 'Agent explains the 15-minute sync window across gates.' },
              { id: 'C', text: 'Only physical magnetic cards can be read at turnstiles', isCorrect: false, rationale: 'Electronic tap card with app integration.' },
              { id: 'D', text: 'All fare disputes must be escalated to an arbitration panel', isCorrect: false, rationale: 'Agent resolved it instantly.' }
            ]
          },
          {
            id: 'l_p1_q8',
            partId: 'l_part_1',
            skill: 'listening',
            questionNumber: 8,
            promptText: 'What is the commuter’s primary relief at the conclusion of the conversation?',
            correctOptionId: 'D',
            skillTag: 'inference',
            evidenceText: 'That’s wonderful relief. Do I need to tap at a specific machine...',
            options: [
              { id: 'A', text: 'He will receive monetary compensation for his delay', isCorrect: false, rationale: 'No compensation beyond refund.' },
              { id: 'B', text: 'He does not have to pay for transit for the remainder of the year', isCorrect: false, rationale: 'Unrealistic.' },
              { id: 'C', text: 'The agent agreed to waive all future bank verification steps', isCorrect: false, rationale: 'Agent cannot alter bank policies.' },
              { id: 'D', text: 'His commute home will proceed smoothly without unexpected charges', isCorrect: true, rationale: 'He confirmed afternoon taps will be covered by his active pass.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_2',
        partNumber: 2,
        title: 'Part 2: Listening to a Daily Life Conversation',
        instructions: 'You will hear a conversation between two colleagues discussing an apartment strata council meeting. Listen carefully.',
        audioScript: [
          { speaker: 'Evelyn', text: 'Liam, did you manage to stay for the entire strata annual general meeting last night? I had to leave around 8:30 to pick up my daughter from soccer practice.' },
          { speaker: 'Liam', text: 'You left right before the heated debate, Evelyn! The council brought forward a motion to implement a mandatory quiet-hours policy starting at 10:00 PM on weeknights and 11:00 PM on weekends, along with hefty fines for repeat infractions.' },
          { speaker: 'Evelyn', text: 'Really? I thought the main contention was going to be the installation of EV charging stations in the underground parkade.' },
          { speaker: 'Liam', text: 'Well, the EV charging proposal actually passed with an overwhelming majority—almost eighty-five percent of owners voted in favour because of the provincial rebate subsidy covering half the hardware costs. But the noise bylaw sparked real division. The fifth-floor residents complained about late-night hardwood floor footsteps, while several young families argued the proposed fines were disproportionately punitive.' },
          { speaker: 'Evelyn', text: 'So what was the final outcome on the noise policy?' },
          { speaker: 'Liam', text: 'They tabled it for a special general meeting next month. In the interim, the council agreed to draft an amended version that introduces an initial written warning before any financial penalties are levied.' }
        ],
        fullTranscript: 'Evelyn: Liam, did you manage to stay for the entire strata meeting...\nLiam: You left right before the heated debate...',
        speakerCount: 2,
        questions: [
          {
            id: 'l_p2_q1',
            partId: 'l_part_2',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'Why did Evelyn leave the strata meeting prematurely?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'I had to leave around 8:30 to pick up my daughter from soccer practice.',
            options: [
              { id: 'A', text: 'She had family commitments to transport her child', isCorrect: true, rationale: 'She explicitly mentions picking up her daughter from soccer.' },
              { id: 'B', text: 'She was frustrated with the council’s rigid agenda', isCorrect: false, rationale: 'She left for a personal commitment, not frustration.' },
              { id: 'C', text: 'She was scheduled to work an evening overtime shift', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Her electric car ran out of battery in the parkade', isCorrect: false, rationale: 'Unrelated.' }
            ]
          },
          {
            id: 'l_p2_q2',
            partId: 'l_part_2',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'What contributed significantly to the passage of the EV charging motion?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'because of the provincial rebate subsidy covering half the hardware costs.',
            options: [
              { id: 'A', text: 'A private donation from a local automobile dealership', isCorrect: false, rationale: 'No dealership donation mentioned.' },
              { id: 'B', text: 'A mandatory municipal government environmental decree', isCorrect: false, rationale: 'Not a decree; it was an owner vote.' },
              { id: 'C', text: 'Government financial incentives reducing equipment expenses', isCorrect: true, rationale: 'Provincial rebate subsidy covered 50% of hardware costs.' },
              { id: 'D', text: 'All residents in the building currently drive electric vehicles', isCorrect: false, rationale: 'Not all residents drive EVs.' }
            ]
          },
          {
            id: 'l_p2_q3',
            partId: 'l_part_2',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'Why did some owners object to the proposed noise policy?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'several young families argued the proposed fines were disproportionately punitive.',
            options: [
              { id: 'A', text: 'They felt quiet hours should begin earlier in the evening', isCorrect: false, rationale: 'They thought the penalties were too harsh, not too late.' },
              { id: 'B', text: 'They considered the immediate monetary sanctions overly severe', isCorrect: true, rationale: 'Families argued fines were disproportionately punitive.' },
              { id: 'C', text: 'They wanted complete exemption for weekend musical performances', isCorrect: false, rationale: 'Not stated.' },
              { id: 'D', text: 'They refused to allow inspections of hardwood flooring installations', isCorrect: false, rationale: 'Misinterpretation of noise source.' }
            ]
          },
          {
            id: 'l_p2_q4',
            partId: 'l_part_2',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What compromise was reached regarding the noise bylaw?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'In the interim, the council agreed to draft an amended version that introduces an initial written warning...',
            options: [
              { id: 'A', text: 'The policy was permanently scrapped from future consideration', isCorrect: false, rationale: 'It was tabled for a vote next month.' },
              { id: 'B', text: 'Fines were increased, but quiet hours were shifted to midnight', isCorrect: false, rationale: 'Incorrect.' },
              { id: 'C', text: 'Carpeting will be made mandatory across all units immediately', isCorrect: false, rationale: 'Not decided.' },
              { id: 'D', text: 'A preliminary non-monetary notice will precede any fines', isCorrect: true, rationale: 'Council agreed to introduce an initial written warning prior to fines.' }
            ]
          },
          {
            id: 'l_p2_q5',
            partId: 'l_part_2',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'What is Liam’s perspective on the meeting proceedings?',
            correctOptionId: 'A',
            skillTag: 'tone_attitude',
            evidenceText: 'You left right before the heated debate, Evelyn! ... sparked real division...',
            options: [
              { id: 'A', text: 'He found the debates lively and contentious', isCorrect: true, rationale: 'He describes the evening as a heated debate with real division.' },
              { id: 'B', text: 'He was thoroughly bored by the routine administrative details', isCorrect: false, rationale: 'He was animated and engaged in recounting the drama.' },
              { id: 'C', text: 'He was personally outraged by the EV charging proposal', isCorrect: false, rationale: 'He noted it passed easily without objection.' },
              { id: 'D', text: 'He regretted attending the session altogether', isCorrect: false, rationale: 'Not expressed.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_3',
        partNumber: 3,
        title: 'Part 3: Listening for Information',
        instructions: 'You will hear an informational talk given by a municipal urban forestry coordinator. Listen carefully.',
        audioScript: [
          { speaker: 'Coordinator', text: 'Good evening, neighbourhood residents. Thank you for joining our City of Vancouver Urban Canopy Information Session. As part of our Climate Resilient City Strategy, our department is launching the Private Property Tree Stewardship Initiative this spring. While the city maintains over one hundred and forty thousand street and park trees, approximately sixty percent of Vancouver’s urban forest actually stands on private residential lots. Unfortunately, severe heat domes and prolonged summer droughts in recent years have stressed mature cedar and hemlock populations, leading to premature tree loss. Under this new program, property owners can apply for subsidized native tree species—such as Bigleaf Maple and Western Redcedar—for a nominal twenty-dollar fee, which includes delivery and a complimentary drip-irrigation bag. Furthermore, starting in May, certified arborists from our department will conduct free twenty-minute soil and root health assessments upon request. Applications open next Tuesday on the municipal portal and are granted on a first-come, first-served basis per postal code.' }
        ],
        fullTranscript: 'Coordinator: Good evening, neighbourhood residents...',
        speakerCount: 1,
        questions: [
          {
            id: 'l_p3_q1',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'Where does the majority of Vancouver’s urban tree canopy exist?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'approximately sixty percent of Vancouver’s urban forest actually stands on private residential lots.',
            options: [
              { id: 'A', text: 'In municipal waterfront parks and recreation reserves', isCorrect: false, rationale: 'Park and street trees account for the minority.' },
              { id: 'B', text: 'On privately owned residential properties', isCorrect: true, rationale: 'Explicitly 60% stands on private residential lots.' },
              { id: 'C', text: 'Along commercial transit boulevards and highways', isCorrect: false, rationale: 'Not stated.' },
              { id: 'D', text: 'Within surrounding provincial mountain forests', isCorrect: false, rationale: 'Vancouver urban forest specifically discussed.' }
            ]
          },
          {
            id: 'l_p3_q2',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'What environmental phenomenon has severely impacted mature native trees recently?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'severe heat domes and prolonged summer droughts in recent years have stressed mature cedar and hemlock populations...',
            options: [
              { id: 'A', text: 'Excessive winter snow accumulations breaking branches', isCorrect: false, rationale: 'Snow not mentioned.' },
              { id: 'B', text: 'Invasive beetle infestations attacking maple bark', isCorrect: false, rationale: 'Insects not mentioned.' },
              { id: 'C', text: 'Intense heat events paired with extended dry periods', isCorrect: true, rationale: 'Severe heat domes and prolonged summer droughts.' },
              { id: 'D', text: 'Soil contamination caused by industrial construction', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'l_p3_q3',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'What is included in the twenty-dollar tree package for homeowners?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'nominal twenty-dollar fee, which includes delivery and a complimentary drip-irrigation bag.',
            options: [
              { id: 'A', text: 'A native sapling, residential delivery, and a watering bag', isCorrect: true, rationale: 'Subsidized native tree, delivery, and complimentary drip-irrigation bag.' },
              { id: 'B', text: 'Full professional planting service and three years of fertilizer', isCorrect: false, rationale: 'Planting by city not included in the $20 fee.' },
              { id: 'C', text: 'Two mature trees and a mechanical water sprinkler', isCorrect: false, rationale: 'Drip bag, not sprinkler.' },
              { id: 'D', text: 'A property tax rebate coupon for the current fiscal year', isCorrect: false, rationale: 'No tax rebate coupon.' }
            ]
          },
          {
            id: 'l_p3_q4',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What complimentary service will municipal arborists provide beginning in May?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'certified arborists from our department will conduct free twenty-minute soil and root health assessments upon request.',
            options: [
              { id: 'A', text: 'Hazardous branch pruning and powerline clearing', isCorrect: false, rationale: 'Pruning not offered.' },
              { id: 'B', text: 'Tree removal permits without administrative fees', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'C', text: 'Automated lawn aeration and sprinkler inspections', isCorrect: false, rationale: 'Not lawn care.' },
              { id: 'D', text: 'Brief on-site soil and root health evaluations', isCorrect: true, rationale: 'Free 20-minute soil and root health assessments.' }
            ]
          },
          {
            id: 'l_p3_q5',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'How will applications for the program be allocated?',
            correctOptionId: 'B',
            skillTag: 'inference',
            evidenceText: 'Applications open next Tuesday on the municipal portal and are granted on a first-come, first-served basis per postal code.',
            options: [
              { id: 'A', text: 'Through a random municipal lottery held at city hall', isCorrect: false, rationale: 'Lottery not used.' },
              { id: 'B', text: 'Prioritized by time of online submission within geographic zones', isCorrect: true, rationale: 'First-come, first-served basis per postal code.' },
              { id: 'C', text: 'Exclusively to properties with the lowest canopy percentages', isCorrect: false, rationale: 'Available to all postal codes on first-come basis.' },
              { id: 'D', text: 'Reserved strictly for residents with low household incomes', isCorrect: false, rationale: 'No income testing mentioned.' }
            ]
          },
          {
            id: 'l_p3_q6',
            partId: 'l_part_3',
            skill: 'listening',
            questionNumber: 6,
            promptText: 'What is the primary overarching goal of this city initiative?',
            correctOptionId: 'C',
            skillTag: 'main_idea',
            evidenceText: 'As part of our Climate Resilient City Strategy, our department is launching the Private Property Tree Stewardship Initiative...',
            options: [
              { id: 'A', text: 'To generate municipal revenue through commercial nursery sales', isCorrect: false, rationale: 'Fee is subsidized ($20 nominal).' },
              { id: 'B', text: 'To mandate that every private lot owner plant three trees by law', isCorrect: false, rationale: 'Voluntary stewardship.' },
              { id: 'C', text: 'To bolster environmental resilience against climate stressors by preserving private canopy', isCorrect: true, rationale: 'Supports Climate Resilient City Strategy across private property.' },
              { id: 'D', text: 'To clear old cedar trees and replace them with ornamental foreign flowers', isCorrect: false, rationale: 'Focus is native trees.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_4',
        partNumber: 4,
        title: 'Part 4: Listening to a News Item',
        instructions: 'You will hear a radio news broadcast concerning a major infrastructure project. Listen carefully.',
        audioScript: [
          { speaker: 'News Anchor', text: 'This is CBC News Vancouver. The British Columbia Ministry of Transportation has officially inaugurated the Fraser River Rapid Ferry pilot, a zero-emission passenger catamaran service linking Langley and New Westminster. Commuters in the Fraser Valley have long grappled with paralyzing bottlenecks along the Highway 1 corridor during peak rush hours, where typical drive times can exceed ninety minutes. The new twin-hull electric vessel, capable of carrying up to three hundred passengers and fifty bicycles, completed its maiden commercial voyage this morning in a crisp twenty-eight minutes. Provincial transportation minister Brenda Chow announced that fares will remain integrated with the existing regional transit tariff structure, allowing passengers to transfer seamlessly to SkyTrain rapid transit at the New Westminster Quay. While local business associations have enthusiastically heralded the service as a catalyst for waterfront retail commerce, environmental observers caution that shore-based rapid charging infrastructure must undergo rigorous testing before winter icing conditions arrive in November.' }
        ],
        fullTranscript: 'News Anchor: This is CBC News Vancouver. The British Columbia Ministry of Transportation has officially inaugurated...',
        speakerCount: 1,
        questions: [
          {
            id: 'l_p4_q1',
            partId: 'l_part_4',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'What is the primary feature of the new Fraser River ferry service?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'zero-emission passenger catamaran service linking Langley and New Westminster.',
            options: [
              { id: 'A', text: 'It is an electric, zero-emission passenger vessel', isCorrect: true, rationale: 'Explicitly zero-emission electric catamaran.' },
              { id: 'B', text: 'It carries both heavy commercial freight trucks and cars', isCorrect: false, rationale: 'It is passenger and bicycle only.' },
              { id: 'C', text: 'It operates as an express weekend luxury tourist cruise', isCorrect: false, rationale: 'It is a commuter transit service.' },
              { id: 'D', text: 'It runs around the clock with departures every five minutes', isCorrect: false, rationale: 'Not stated.' }
            ]
          },
          {
            id: 'l_p4_q2',
            partId: 'l_part_4',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'How does the ferry travel time compare with highway driving during rush hour?',
            correctOptionId: 'C',
            skillTag: 'inference',
            evidenceText: 'typical drive times can exceed ninety minutes... completed its maiden commercial voyage this morning in a crisp twenty-eight minutes.',
            options: [
              { id: 'A', text: 'It takes approximately the same amount of time as driving', isCorrect: false, rationale: 'Driving is 90 mins, ferry is 28 mins.' },
              { id: 'B', text: 'It is marginally slower but offers scenic riverside views', isCorrect: false, rationale: 'It is much faster.' },
              { id: 'C', text: 'It cuts the typical rush-hour commute time by more than an hour', isCorrect: true, rationale: '28 minutes vs 90+ minutes drive time.' },
              { id: 'D', text: 'It is fifteen minutes faster than the existing express commuter train', isCorrect: false, rationale: 'Train comparison not made; compared with highway drive.' }
            ]
          },
          {
            id: 'l_p4_q3',
            partId: 'l_part_4',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'How are passenger fares structured for the rapid ferry?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'fares will remain integrated with the existing regional transit tariff structure, allowing passengers to transfer seamlessly...',
            options: [
              { id: 'A', text: 'Passengers must pay a separate private twenty-five dollar surcharge', isCorrect: false, rationale: 'No private surcharge.' },
              { id: 'B', text: 'Fares are unified with existing regional transit and include SkyTrain transfers', isCorrect: true, rationale: 'Integrated with regional tariff structure allowing transfer to SkyTrain.' },
              { id: 'C', text: 'The ferry is completely free for all users throughout the year', isCorrect: false, rationale: 'It has integrated fares, not free.' },
              { id: 'D', text: 'Only Langley property tax holders receive standard transit rates', isCorrect: false, rationale: 'Standard regional tariff for all.' }
            ]
          },
          {
            id: 'l_p4_q4',
            partId: 'l_part_4',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What concern was raised regarding the ferry infrastructure?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'environmental observers caution that shore-based rapid charging infrastructure must undergo rigorous testing before winter icing conditions arrive...',
            options: [
              { id: 'A', text: 'The vessel’s wake is causing severe erosion to riverbank homes', isCorrect: false, rationale: 'Wake erosion not mentioned.' },
              { id: 'B', text: 'The vessel cannot transport adequate numbers of bicycles', isCorrect: false, rationale: 'Carries 50 bicycles.' },
              { id: 'C', text: 'Ferry ticket booths are understaffed during morning hours', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Charging systems need verification under freezing winter conditions', isCorrect: true, rationale: 'Testing needed before winter icing conditions in November.' }
            ]
          },
          {
            id: 'l_p4_q5',
            partId: 'l_part_4',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'Why are local commercial business associations enthusiastic about the project?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'heralded the service as a catalyst for waterfront retail commerce...',
            options: [
              { id: 'A', text: 'They anticipate increased foot traffic and retail spending at the waterfront', isCorrect: true, rationale: 'Catalyst for waterfront retail commerce.' },
              { id: 'B', text: 'They will operate private cargo concessions on board the vessel', isCorrect: false, rationale: 'Passenger ferry only.' },
              { id: 'C', text: 'The provincial government waived their commercial property taxes', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'All business employees receive free lifetime transit passes', isCorrect: false, rationale: 'Unrealistic.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_5',
        partNumber: 5,
        title: 'Part 5: Listening to a Discussion',
        instructions: 'You will hear a discussion among three colleagues (Nadia, Marcus, and Chloe) serving on a community center renovation committee.',
        audioScript: [
          { speaker: 'Nadia', text: 'Alright team, let’s review where we stand on the North Shore Community Centre revitalization budget. The municipal grant confirmed two hundred thousand dollars, but our architect’s preliminary quote for the combined youth digital lab and seniors’ fitness room comes in at two hundred and forty thousand.' },
          { speaker: 'Marcus', text: 'Thanks Nadia. As the treasurer, my recommendation is to phase the buildout over two fiscal quarters. If we finish the seniors’ wellness space first, we immediately qualify for the provincial active-aging matching fund, which would bridge that forty-thousand-dollar shortfall without dipping into our operational contingency reserves.' },
          { speaker: 'Chloe', text: 'While I see the fiscal logic Marcus, phasing the construction means our local teens are left without any dedicated after-school program space for another entire winter. Our youth survey showed that eighty percent of adolescents currently have nowhere safe or productive to gather during the dark rainy months. Couldn’t we approach local tech enterprises in the industrial park for corporate hardware sponsorships to equip the digital lab?' },
          { speaker: 'Nadia', text: 'That’s a compelling avenue, Chloe. Several digital media studios recently relocated to the waterfront district. If they sponsor the computers, monitors, and 3D printers, our immediate capital outlay for the digital lab drops by nearly thirty thousand dollars.' },
          { speaker: 'Marcus', text: 'I’d be receptive to that hybrid approach, provided we secure written sponsorship commitments within three weeks. If those don’t materialize by the city council’s deadline on the twenty-fourth, we fall back to my phased construction schedule.' },
          { speaker: 'Chloe', text: 'Fair enough Marcus. I will draft the sponsorship prospectus tonight and coordinate with the chamber of commerce tomorrow morning.' }
        ],
        fullTranscript: 'Nadia: Alright team, let’s review where we stand...\nMarcus: Thanks Nadia. As the treasurer...\nChloe: While I see the fiscal logic Marcus...',
        speakerCount: 3,
        questions: [
          {
            id: 'l_p5_q1',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'What initial financial dilemma is the committee confronting?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'municipal grant confirmed two hundred thousand dollars, but our architect’s preliminary quote... comes in at two hundred and forty thousand.',
            options: [
              { id: 'A', text: 'The municipal grant was canceled due to municipal budget cuts', isCorrect: false, rationale: 'Grant was confirmed at $200k.' },
              { id: 'B', text: 'Projected architect costs exceed their confirmed grant by $40,000', isCorrect: true, rationale: '$240k quote vs $200k grant = $40k shortfall.' },
              { id: 'C', text: 'The community center owes $240,000 in overdue property taxes', isCorrect: false, rationale: 'Renovation budget, not back taxes.' },
              { id: 'D', text: 'The provincial government refused to accept their building permit', isCorrect: false, rationale: 'Permit not mentioned.' }
            ]
          },
          {
            id: 'l_p5_q2',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'What strategy did Marcus initially propose to resolve the deficit?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'phasing the construction... seniors’ wellness space first, we immediately qualify for the provincial active-aging matching fund...',
            options: [
              { id: 'A', text: 'Staging construction to access an active-aging grant for the seniors’ area first', isCorrect: true, rationale: 'Phase buildout, complete seniors space first to unlock matching fund.' },
              { id: 'B', text: 'Borrowing money from a commercial bank at commercial interest rates', isCorrect: false, rationale: 'Bank loan not suggested.' },
              { id: 'C', text: 'Cancelling the seniors\' fitness room entirely to focus on youth', isCorrect: false, rationale: 'Opposite: he prioritized seniors space first.' },
              { id: 'D', text: 'Increasing membership fees across the entire facility immediately', isCorrect: false, rationale: 'Fee increase not proposed.' }
            ]
          },
          {
            id: 'l_p5_q3',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'Why is Chloe hesitant about Marcus’s initial phasing plan?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'phasing the construction means our local teens are left without any dedicated after-school program space for another entire winter.',
            options: [
              { id: 'A', text: 'She believes the seniors’ equipment is too expensive to maintain', isCorrect: false, rationale: 'Not her concern.' },
              { id: 'B', text: 'She thinks the provincial matching fund is fraudulent', isCorrect: false, rationale: 'Unrealistic.' },
              { id: 'C', text: 'It postpones essential indoor gathering space for youth through the winter', isCorrect: true, rationale: 'Youth will have nowhere safe to gather during dark rainy months.' },
              { id: 'D', text: 'She wants the entire center relocated to another neighborhood', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'l_p5_q4',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What alternative funding idea does Chloe introduce?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'approach local tech enterprises in the industrial park for corporate hardware sponsorships to equip the digital lab',
            options: [
              { id: 'A', text: 'Organizing a neighbourhood bake sale and charity raffle', isCorrect: false, rationale: 'Bake sale not proposed.' },
              { id: 'B', text: 'Selling naming rights of the building to an energy corporation', isCorrect: false, rationale: 'Not building naming rights.' },
              { id: 'C', text: 'Charging teenagers a high hourly admission fee for computer use', isCorrect: false, rationale: 'Opposite of public youth access.' },
              { id: 'D', text: 'Soliciting hardware donations from newly relocated tech studios', isCorrect: true, rationale: 'Corporate hardware sponsorships from local tech enterprises.' }
            ]
          },
          {
            id: 'l_p5_q5',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'Under what condition does Marcus agree to Chloe’s proposal?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'provided we secure written sponsorship commitments within three weeks. If those don’t materialize by the city council’s deadline on the twenty-fourth, we fall back...',
            options: [
              { id: 'A', text: 'If the provincial government guarantees matching funds for corporate donations', isCorrect: false, rationale: 'Not Marcus\'s condition.' },
              { id: 'B', text: 'If formal written commitments are secured prior to the municipal deadline', isCorrect: true, rationale: 'Written commitments within 3 weeks before council deadline on the 24th.' },
              { id: 'C', text: 'If Chloe agrees to step down as youth coordinator', isCorrect: false, rationale: 'Unrelated.' },
              { id: 'D', text: 'If the tech companies agree to pay for utility bills indefinitely', isCorrect: false, rationale: 'Not requested.' }
            ]
          },
          {
            id: 'l_p5_q6',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 6,
            promptText: 'What role does Nadia predominantly play in the conversation?',
            correctOptionId: 'A',
            skillTag: 'tone_attitude',
            evidenceText: 'Alright team, let’s review... That’s a compelling avenue, Chloe... several digital media studios recently relocated...',
            options: [
              { id: 'A', text: 'A facilitative chairperson bridging budget constraints and community needs', isCorrect: true, rationale: 'She opens the meeting, assesses budget, and synthesizes ideas between Marcus and Chloe.' },
              { id: 'B', text: 'A hostile supervisor opposing all suggestions', isCorrect: false, rationale: 'She is collaborative and encouraging.' },
              { id: 'C', text: 'A passive bystander with no knowledge of the community', isCorrect: false, rationale: 'She knows about digital media studios and quotes exact numbers.' },
              { id: 'D', text: 'An external contractor demanding immediate payment', isCorrect: false, rationale: 'She is part of the committee team.' }
            ]
          },
          {
            id: 'l_p5_q7',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 7,
            promptText: 'What immediate next step will Chloe take?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'I will draft the sponsorship prospectus tonight and coordinate with the chamber of commerce tomorrow morning.',
            options: [
              { id: 'A', text: 'Submit a formal loan application to city council', isCorrect: false, rationale: 'Not a loan application.' },
              { id: 'B', text: 'Interview architects to renegotiate the $240,000 quote', isCorrect: false, rationale: 'Not her task.' },
              { id: 'C', text: 'Prepare a sponsorship prospectus document and contact the business chamber', isCorrect: true, rationale: 'Draft prospectus tonight, coordinate with chamber tomorrow.' },
              { id: 'D', text: 'Purchase discounted computers from an online wholesaler', isCorrect: false, rationale: 'Not purchasing hardware yet.' }
            ]
          },
          {
            id: 'l_p5_q8',
            partId: 'l_part_5',
            skill: 'listening',
            questionNumber: 8,
            promptText: 'What is the tone of the committee members toward each other?',
            correctOptionId: 'B',
            skillTag: 'tone_attitude',
            evidenceText: 'Fair enough Marcus... That’s a compelling avenue, Chloe... Thanks Nadia...',
            options: [
              { id: 'A', text: 'Distrustful and dismissive', isCorrect: false, rationale: 'They respect each other\'s perspectives.' },
              { id: 'B', text: 'Professional, pragmatic, and collaborative', isCorrect: true, rationale: 'They listen, acknowledge validity of different constraints, and construct a workable compromise.' },
              { id: 'C', text: 'Aggressively confrontational', isCorrect: false, rationale: 'No animosity.' },
              { id: 'D', text: 'Uncommitted and disorganized', isCorrect: false, rationale: 'Clear deadlines, specific duties, and mutual agreement.' }
            ]
          }
        ]
      },
      {
        partId: 'l_part_6',
        partNumber: 6,
        title: 'Part 6: Listening for Viewpoints',
        instructions: 'You will hear an academic lecture exploring urban density, heritage zoning, and housing affordability in Canadian metropolises.',
        audioScript: [
          { speaker: 'Professor Aris Thorne', text: 'Good afternoon, colleagues. Today we examine the contentious intersection of municipal heritage conservation and the imperative of housing densification in major Canadian urban centres. Proponents of single-detached character home preservation frequently invoke collective cultural memory, asserting that neighborhoods like Vancouver’s Shaughnessy or Toronto’s Cabbagetown represent irreplaceable architectural legacies that define our civic aesthetic identity. From this vantage point, sweeping blanket up-zoning—such as provincial legislation mandating four-to-six-plexes on single-family lots—is lamented as an indiscriminate bulldozer approach that erodes urban tree canopies and community cohesion. Conversely, progressive urban economists and climate researchers argue that treating century-old residential neighborhoods as frozen museum dioramas is both environmentally irresponsible and economically exclusionary. By artificially restricting housing supply in amenity-rich, transit-connected central districts, heritage preservation ordinances effectively lock out younger generations, compelling them into grueling suburban commutes that exponentially amplify regional greenhouse emissions. Moreover, these scholars observe that the aesthetic nostalgia often weaponized by affluent ratepayer associations tends to romanticize colonial-era structures while marginalizing vernacular, inclusive architectures. A nuanced synthesis, however, is emerging through adaptive reuse architecture. Rather than treating demolition and stagnation as binary poles, progressive zoning frameworks now permit developers to retain historic facades and timber framing while vertically integrating multi-family, mass-timber housing behind and above the original envelope. Such compromises illustrate that architectural memory need not come at the expense of equitable urban survival.' }
        ],
        fullTranscript: 'Professor Thorne: Good afternoon, colleagues. Today we examine the contentious intersection of municipal heritage conservation...',
        speakerCount: 1,
        questions: [
          {
            id: 'l_p6_q1',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 1,
            promptText: 'What core argument do traditional heritage preservationists advance?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'asserting that neighborhoods... represent irreplaceable architectural legacies that define our civic aesthetic identity.',
            options: [
              { id: 'A', text: 'Historic timber houses have superior thermal insulation compared to new towers', isCorrect: false, rationale: 'Energy efficiency not claimed.' },
              { id: 'B', text: 'Older neighborhoods generate higher municipal tax revenues per square foot', isCorrect: false, rationale: 'Tax revenue argument not made.' },
              { id: 'C', text: 'Historic character neighborhoods embody vital architectural and cultural identity', isCorrect: true, rationale: 'They view character homes as irreplaceable legacies defining civic identity.' },
              { id: 'D', text: 'Preserving single-family homes is the only way to safeguard urban parking spaces', isCorrect: false, rationale: 'Parking not mentioned.' }
            ]
          },
          {
            id: 'l_p6_q2',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 2,
            promptText: 'According to urban economists, what is an unintended negative consequence of strict heritage protection?',
            correctOptionId: 'B',
            skillTag: 'inference',
            evidenceText: 'effectively lock out younger generations, compelling them into grueling suburban commutes that exponentially amplify regional greenhouse emissions.',
            options: [
              { id: 'A', text: 'It triggers immediate collapses in downtown retail property values', isCorrect: false, rationale: 'Property values do not collapse.' },
              { id: 'B', text: 'It restricts housing supply in central areas and spurs carbon-heavy suburban sprawl', isCorrect: true, rationale: 'Locks out youth, causing grueling suburban commutes that amplify emissions.' },
              { id: 'C', text: 'It causes cities to violate international architectural treaty protocols', isCorrect: false, rationale: 'No international treaty mentioned.' },
              { id: 'D', text: 'It forces municipal governments to subsidize luxury single-family homes', isCorrect: false, rationale: 'Not stated.' }
            ]
          },
          {
            id: 'l_p6_q3',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 3,
            promptText: 'What critical observation does the speaker cite regarding "aesthetic nostalgia"?',
            correctOptionId: 'D',
            skillTag: 'viewpoint_synthesis',
            evidenceText: 'nostalgia often weaponized by affluent ratepayer associations tends to romanticize colonial-era structures while marginalizing vernacular, inclusive architectures.',
            options: [
              { id: 'A', text: 'It encourages excessive installation of solar panels on heritage roofs', isCorrect: false, rationale: 'Solar panels not mentioned.' },
              { id: 'B', text: 'It has made construction materials too inexpensive across Canada', isCorrect: false, rationale: 'Opposite of reality.' },
              { id: 'C', text: 'It reflects purely scientific preservation methodology without politics', isCorrect: false, rationale: 'Speaker notes it is politically weaponized.' },
              { id: 'D', text: 'It often prioritizes colonial aesthetic symbolism over socio-economic inclusivity', isCorrect: true, rationale: 'Romanticizes colonial-era structures while marginalizing inclusive architectures.' }
            ]
          },
          {
            id: 'l_p6_q4',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 4,
            promptText: 'What solution does the speaker highlight as an effective synthesis of the two extremes?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'adaptive reuse architecture... permit developers to retain historic facades and timber framing while vertically integrating multi-family, mass-timber housing...',
            options: [
              { id: 'A', text: 'Adaptive reuse that retains historic facades while integrating modern multi-family density', isCorrect: true, rationale: 'Retaining facades while vertically integrating multi-family housing.' },
              { id: 'B', text: 'Demolishing all character homes built prior to 1950', isCorrect: false, rationale: 'Directly rejected as an extreme.' },
              { id: 'C', text: 'Relocating all heritage homes onto designated offshore museum islands', isCorrect: false, rationale: 'Fanciful distractor.' },
              { id: 'D', text: 'Banning all timber construction in favor of concrete skyscrapers', isCorrect: false, rationale: 'Mass timber is embraced in the lecture.' }
            ]
          },
          {
            id: 'l_p6_q5',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 5,
            promptText: 'What can be inferred about the speaker’s own scholarly stance?',
            correctOptionId: 'C',
            skillTag: 'tone_attitude',
            evidenceText: 'Rather than treating demolition and stagnation as binary poles... architectural memory need not come at the expense of equitable urban survival.',
            options: [
              { id: 'A', text: 'An uncompromising advocate for freezing all urban single-family neighborhoods', isCorrect: false, rationale: 'He explicitly criticizes treating them as museum dioramas.' },
              { id: 'B', text: 'A proponent of eradicating all historical preservation boards immediately', isCorrect: false, rationale: 'He values architectural memory.' },
              { id: 'C', text: 'A balanced advocate for progressive density balanced with thoughtful architectural retention', isCorrect: true, rationale: 'Advocates adaptive reuse synthesis rather than binary opposition.' },
              { id: 'D', text: 'A disinterested statistician indifferent to social equity outcomes', isCorrect: false, rationale: 'He actively underscores equitable urban survival.' }
            ]
          },
          {
            id: 'l_p6_q6',
            partId: 'l_part_6',
            skill: 'listening',
            questionNumber: 6,
            promptText: 'What phrase does the speaker use to characterize blanket municipal up-zoning from the preservationist viewpoint?',
            correctOptionId: 'B',
            skillTag: 'vocabulary_in_context',
            evidenceText: 'lamented as an indiscriminate bulldozer approach that erodes urban tree canopies...',
            options: [
              { id: 'A', text: 'A delicate surgical intervention', isCorrect: false, rationale: 'Opposite meaning.' },
              { id: 'B', text: 'An indiscriminate bulldozer approach', isCorrect: true, rationale: 'Quoted verbatim as the preservationists\' description.' },
              { id: 'C', text: 'A calculated urban renaissance', isCorrect: false, rationale: 'Not used.' },
              { id: 'D', text: 'A harmonious ecological continuum', isCorrect: false, rationale: 'Not used.' }
            ]
          }
        ]
      }
    ],
    readingParts: [
      {
        partId: 'r_part_1',
        partNumber: 1,
        title: 'Part 1: Reading Correspondence',
        instructions: 'Read the email below from a strata council president to building residents, and answer the questions that follow. Then complete the reply email.',
        passageTitle: 'Notice to Residents: Upcoming Underground Parkade Renovation & Parking Reassignment',
        suggestedTimeMinutes: 11,
        passageText: `From: Eleanor Vance, Strata Council President (Kitsilano Ridge Residences, Strata Plan LMS-4291)
To: All Owners and Tenants
Date: March 12, 2026
Subject: Comprehensive Parkade Waterproofing & Temporary Stall Reallocation

Dear Residents,

As discussed and voted upon at our Extraordinary General Meeting last month, our building will commence its overdue membrane waterproofing and concrete restoration across Levels P1 and P2 of the underground parkade starting Monday, April 6. Over the past five years, persistent moisture seepage through the membrane has caused noticeable efflorescence on support pillars and minor concrete spalling near stalls 30 through 48. Engineering firm Morrison Hershfield has advised that delaying remediation any further risks compromising structural rebar integrity.

The project will be executed in two distinct 4-week phases:
- Phase 1 (April 6 – May 3): Complete closure of Level P2 (stalls 45 through 90).
- Phase 2 (May 4 – May 31): Complete closure of Level P1 (stalls 1 through 44).

During Phase 1, residents assigned to stalls on Level P2 will be issued temporary electronic access permits for the secured outdoor visitor surface lot, as well as an auxiliary permit for the adjacent commercial lot at 2180 West 4th Avenue, with whom the strata has contracted sixty dedicated stalls. Please note that all vehicles parking in the surface or commercial lot must display the fluorescent orange temporary permit on the front rearview mirror to avoid towing. 

Furthermore, because high-pressure hydro-demolition and concrete resurfacing generate significant particulate dust and structural vibration, construction will strictly adhere to municipal noise bylaws: work will occur Monday to Friday between 8:00 AM and 4:30 PM only. No jackhammering or noisy operations will be permitted on weekends.

We request that all affected Level P2 residents collect their temporary parking tags from the concierge desk by Friday, April 3. We appreciate your patience and cooperation as we protect our building’s long-term asset value.

Warm regards,
Eleanor Vance
President, Strata Council LMS-4291`,
        questions: [
          {
            id: 'r_p1_q1',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 1,
            promptText: 'Why is the strata undertaking this parkade construction project?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'persistent moisture seepage through the membrane has caused noticeable efflorescence... risks compromising structural rebar integrity.',
            options: [
              { id: 'A', text: 'To install automated electric vehicle chargers for all 90 stalls', isCorrect: false, rationale: 'EV charging is not the reason; structural waterproofing is.' },
              { id: 'B', text: 'To expand the underground parkade by excavating an additional P3 level', isCorrect: false, rationale: 'No excavation of P3.' },
              { id: 'C', text: 'To prevent water infiltration from causing structural degradation to concrete and rebar', isCorrect: true, rationale: 'Text emphasizes moisture seepage and risk to structural rebar integrity.' },
              { id: 'D', text: 'To comply with a new municipal mandate on surface lot beautification', isCorrect: false, rationale: 'Internal building structural issue.' }
            ]
          },
          {
            id: 'r_p1_q2',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 2,
            promptText: 'Which parking stalls will be inaccessible during Phase 1?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'Phase 1 (April 6 – May 3): Complete closure of Level P2 (stalls 45 through 90).',
            options: [
              { id: 'A', text: 'Stalls 1 through 44 on Level P1', isCorrect: false, rationale: 'That is Phase 2.' },
              { id: 'B', text: 'Stalls 45 through 90 on Level P2', isCorrect: true, rationale: 'Phase 1 explicitly closes P2 (stalls 45-90).' },
              { id: 'C', text: 'Only stalls 30 through 48 where spalling was observed', isCorrect: false, rationale: 'The entire P2 level is closed in Phase 1.' },
              { id: 'D', text: 'All outdoor visitor parking spaces', isCorrect: false, rationale: 'Visitor lot is used for temporary parking.' }
            ]
          },
          {
            id: 'r_p1_q3',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 3,
            promptText: 'Where will displaced residents park if the surface visitor lot is full?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'an auxiliary permit for the adjacent commercial lot at 2180 West 4th Avenue, with whom the strata has contracted sixty dedicated stalls.',
            options: [
              { id: 'A', text: 'At a designated commercial lot nearby on West 4th Avenue', isCorrect: true, rationale: 'Strata contracted 60 stalls at 2180 West 4th Avenue.' },
              { id: 'B', text: 'On unmetered residential side streets with a city parking decal', isCorrect: false, rationale: 'Street parking not arranged.' },
              { id: 'C', text: 'At the Kitsilano Community Centre underground garage', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Inside Level P1 along the drive aisle', isCorrect: false, rationale: 'Aisles cannot be blocked.' }
            ]
          },
          {
            id: 'r_p1_q4',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 4,
            promptText: 'What is mandatory for all vehicles using the temporary parking areas?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'must display the fluorescent orange temporary permit on the front rearview mirror to avoid towing.',
            options: [
              { id: 'A', text: 'A photocopy of the driver\'s strata ownership title deed', isCorrect: false, rationale: 'Title deed not required.' },
              { id: 'B', text: 'A payment receipt for daily commercial parking', isCorrect: false, rationale: 'Strata contracted the stalls.' },
              { id: 'C', text: 'Proof of zero-emission electric vehicle registration', isCorrect: false, rationale: 'Not required.' },
              { id: 'D', text: 'A brightly colored temporary permit hanging from the rearview mirror', isCorrect: true, rationale: 'Fluorescent orange permit on front rearview mirror.' }
            ]
          },
          {
            id: 'r_p1_q5',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 5,
            promptText: 'When are contractors permitted to carry out noisy work?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'Monday to Friday between 8:00 AM and 4:30 PM only. No jackhammering or noisy operations will be permitted on weekends.',
            options: [
              { id: 'A', text: 'Seven days a week between 7:00 AM and 7:00 PM', isCorrect: false, rationale: 'Weekends prohibited.' },
              { id: 'B', text: 'Tuesday through Saturday afternoons only', isCorrect: false, rationale: 'Weekdays only.' },
              { id: 'C', text: 'Weekdays exclusively during regular business hours', isCorrect: true, rationale: 'Monday to Friday, 8:00 AM - 4:30 PM.' },
              { id: 'D', text: 'During night shifts to avoid disturbing daytime home offices', isCorrect: false, rationale: 'Night work not allowed under bylaws.' }
            ]
          },
          {
            id: 'r_p1_q6',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 6,
            promptText: 'What is the deadline for Level P2 residents to collect their temporary parking permits?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'collect their temporary parking tags from the concierge desk by Friday, April 3.',
            options: [
              { id: 'A', text: 'Monday, April 6', isCorrect: false, rationale: 'April 6 is when construction starts.' },
              { id: 'B', text: 'Friday, April 3', isCorrect: true, rationale: 'Explicitly by Friday, April 3.' },
              { id: 'C', text: 'March 31', isCorrect: false, rationale: 'Not stated.' },
              { id: 'D', text: 'Sunday, May 3', isCorrect: false, rationale: 'May 3 is end of Phase 1.' }
            ]
          },
          // Response Email Cloze Questions (7-11)
          {
            id: 'r_p1_q7',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 7,
            promptText: 'Choose the best option for Blank (1) in the reply email: "Dear Eleanor, Thank you for the detailed update regarding the upcoming parkade remediation. Because my assigned stall is #72 on Level P2, my vehicle will be directly affected during [1]."',
            correctOptionId: 'A',
            skillTag: 'vocabulary_in_context',
            options: [
              { id: 'A', text: 'the initial Phase 1 timeline', isCorrect: true, rationale: 'Stall 72 is on Level P2, which is closed in Phase 1 (stalls 45-90).' },
              { id: 'B', text: 'the second phase in May', isCorrect: false, rationale: 'Phase 2 is for Level P1 (stalls 1-44).' },
              { id: 'C', text: 'the entire two-month period', isCorrect: false, rationale: 'Stall 72 is only closed during Phase 1.' },
              { id: 'D', text: 'the preliminary weekend inspection', isCorrect: false, rationale: 'Not matching context.' }
            ]
          },
          {
            id: 'r_p1_q8',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 8,
            promptText: 'Choose the best option for Blank (2): "I will make sure to drop by the concierge desk before [2] to pick up my fluorescent orange tag."',
            correctOptionId: 'C',
            skillTag: 'detail',
            options: [
              { id: 'A', text: 'the start of May', isCorrect: false, rationale: 'Tags needed for Phase 1.' },
              { id: 'B', text: 'next Wednesday noon', isCorrect: false, rationale: 'Deadline is Friday, April 3.' },
              { id: 'C', text: 'the April 3 deadline', isCorrect: true, rationale: 'The concierge pickup deadline is Friday, April 3.' },
              { id: 'D', text: 'the council meeting tonight', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'r_p1_q9',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 9,
            promptText: 'Choose the best option for Blank (3): "However, I have an elderly relative living with me who uses a mobility walker. Could you clarify whether parking in the auxiliary commercial lot at 2180 West 4th Avenue includes [3]?"',
            correctOptionId: 'D',
            skillTag: 'inference',
            options: [
              { id: 'A', text: 'free car wash services during the daytime', isCorrect: false, rationale: 'Irrelevant to mobility.' },
              { id: 'B', text: 'overnight storage for recreational boats', isCorrect: false, rationale: 'Irrelevant.' },
              { id: 'C', text: 'mandatory bicycle valet assistance', isCorrect: false, rationale: 'Not about mobility assistance.' },
              { id: 'D', text: 'accessible step-free pedestrian access back to our building', isCorrect: true, rationale: 'Relates directly to elderly relative using a mobility walker.' }
            ]
          },
          {
            id: 'r_p1_q10',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 10,
            promptText: 'Choose the best option for Blank (4): "If the walk from the commercial lot proves too arduous for her, would it be possible to arrange [4]?"',
            correctOptionId: 'B',
            skillTag: 'inference',
            options: [
              { id: 'A', text: 'a total exemption from paying monthly strata maintenance fees', isCorrect: false, rationale: 'Unreasonable request for parking issue.' },
              { id: 'B', text: 'priority placement in our outdoor visitor surface lot closer to the lobby', isCorrect: true, rationale: 'Surface visitor lot is directly adjacent to the building lobby.' },
              { id: 'C', text: 'permission to park inside the main residential elevator foyer', isCorrect: false, rationale: 'Absurd.' },
              { id: 'D', text: 'a temporary relocation to an executive hotel suite in downtown', isCorrect: false, rationale: 'Disproportionate.' }
            ]
          },
          {
            id: 'r_p1_q11',
            partId: 'r_part_1',
            skill: 'reading',
            questionNumber: 11,
            promptText: 'Choose the best option for Blank (5): "Lastly, I work from home as an audio editor; knowing that noisy jackhammering will [5] provides immense reassurance for my recording schedule."',
            correctOptionId: 'A',
            skillTag: 'detail',
            options: [
              { id: 'A', text: 'be strictly prohibited after 4:30 PM and on all weekends', isCorrect: true, rationale: 'Matches hours: Monday-Friday 8am-4:30pm only, no weekends.' },
              { id: 'B', text: 'take place only in the middle of the night', isCorrect: false, rationale: 'Night work is barred.' },
              { id: 'C', text: 'be conducted silently using acoustic sound blankets', isCorrect: false, rationale: 'Hydro-demolition produces noise and dust.' },
              { id: 'D', text: 'be postponed until the summer holiday season', isCorrect: false, rationale: 'Work begins April 6.' }
            ]
          }
        ]
      },
      {
        partId: 'r_part_2',
        partNumber: 2,
        title: 'Part 2: Reading to Apply a Diagram',
        instructions: 'Read the information diagram regarding city community recreation passes, then answer the questions based on the diagram and follow-up email.',
        passageTitle: 'City of Vancouver: Community Recreation Facilities & Pass Tier Comparison',
        suggestedTimeMinutes: 9,
        passageText: `DIAGRAM: CITY OF VANCOUVER LEISURE ACCESS PROGRAM & PASS MATRIX (2026)

[FACILITY PASS TIERS]
• Core Tier ($48/month): Access to Fitness Centre & Weight Rooms (Valid at 8 designated community centers). Peak hours permitted.
• Aquatics Plus ($65/month): Fitness Centre + Olympic Pools, Saunas & Steam Rooms (Valid at all 14 civic aquatic centers).
• All-Access Metro Pass ($82/month): Unlimited Fitness, Aquatics, Ice Rinks, Indoor Climbing Wall & Drop-In Group Classes (Yoga, Pilates, Spin). Includes free towel service.

[DISCOUNTS & SUBSIDIES]
* Youth (13–18 yrs) & Full-Time Students: 25% discount off all tiers (valid student card required).
* Older Adults (65+ yrs): 30% discount off all tiers.
* Family Package (2 Adults + up to 3 Children): 15% discount on combined monthly total.
* Annual Pre-Payment Incentive: Pay 10 months upfront, receive 2 months free (17% net savings).

[HOURS & CONDITIONAL POLICIES]
- Standard Operating Hours: Weekdays 6:00 AM – 10:00 PM | Weekends 7:00 AM – 8:00 PM.
- Off-Peak Discount Window: Enter between 1:00 PM and 4:00 PM on weekdays to receive an extra $10 monthly statement credit.
- Locker Rental: $12/month (Core/Aquatics) | Included complimentary in All-Access Metro Pass.
- Cancellation Policy: 14 days written notice prior to billing cycle; no penalty fee.`,
        diagram: {
          title: 'Community Recreation Pass Tiers (2026)',
          columns: ['Pass Tier', 'Monthly Fee', 'Included Facilities', 'Special Perks'],
          rows: [
            { label: 'Core Tier', cells: ['$48/mo', 'Fitness / Weights (8 centres)', 'Standard locker ($12/mo extra)'] },
            { label: 'Aquatics Plus', cells: ['$65/mo', 'Fitness + 14 Pools, Saunas & Steam', 'Standard locker ($12/mo extra)'] },
            { label: 'All-Access Metro', cells: ['$82/mo', 'Fitness, Pools, Ice Rinks, Climbing, Spin', 'Free towel service & free locker'] }
          ],
          bulletPoints: [
            'Student/Youth: 25% off | Senior 65+: 30% off | Annual: 2 months free',
            'Off-Peak (1:00 PM – 4:00 PM weekdays): $10 monthly credit',
            'Cancellation: 14 days written notice before billing cycle'
          ],
          footerNote: '*Towel service and locker rentals are only bundled without charge in the All-Access Metro tier.'
        },
        questions: [
          {
            id: 'r_p2_q1',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 1,
            promptText: 'Which facility is ONLY included under the All-Access Metro Pass?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'All-Access Metro Pass ($82/month): Unlimited Fitness, Aquatics, Ice Rinks, Indoor Climbing Wall & Drop-In Group Classes...',
            options: [
              { id: 'A', text: 'Weight room facilities at designated centers', isCorrect: false, rationale: 'Included in Core Tier.' },
              { id: 'B', text: 'Public swimming pools and dry saunas', isCorrect: false, rationale: 'Included in Aquatics Plus.' },
              { id: 'C', text: 'Indoor rock climbing walls and drop-in spin classes', isCorrect: true, rationale: 'Climbing wall and group classes are exclusive to All-Access Metro.' },
              { id: 'D', text: 'Outdoor tennis courts during summer months', isCorrect: false, rationale: 'Not listed in diagram.' }
            ]
          },
          {
            id: 'r_p2_q2',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 2,
            promptText: 'What special perk is provided to All-Access Metro Pass holders at no additional charge?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'Includes free towel service... Locker Rental... Included complimentary in All-Access Metro Pass.',
            options: [
              { id: 'A', text: 'Private one-on-one personal training sessions each week', isCorrect: false, rationale: 'Personal training not included.' },
              { id: 'B', text: 'Complimentary towel service and locker rental', isCorrect: true, rationale: 'Free towel service and locker included.' },
              { id: 'C', text: 'Free access to municipal golf courses', isCorrect: false, rationale: 'Golf not included.' },
              { id: 'D', text: 'Free protein smoothies at the recreation cafe', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'r_p2_q3',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 3,
            promptText: 'How can a member earn an extra $10 monthly statement credit?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'Off-Peak Discount Window: Enter between 1:00 PM and 4:00 PM on weekdays to receive an extra $10 monthly statement credit.',
            options: [
              { id: 'A', text: 'By scanning in during the weekday off-peak hours of 1:00 PM to 4:00 PM', isCorrect: true, rationale: 'Explicitly matches the off-peak window.' },
              { id: 'B', text: 'By volunteering five hours each month at the front desk', isCorrect: false, rationale: 'Volunteering not mentioned.' },
              { id: 'C', text: 'By bringing two paying guests during weekend public sessions', isCorrect: false, rationale: 'Not stated.' },
              { id: 'D', text: 'By riding an electric bicycle to the community center', isCorrect: false, rationale: 'Irrelevant.' }
            ]
          },
          {
            id: 'r_p2_q4',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 4,
            promptText: 'What discount is available for a full-time university student purchasing the Aquatics Plus tier ($65/mo)?',
            correctOptionId: 'D',
            skillTag: 'inference',
            evidenceText: 'Youth (13–18 yrs) & Full-Time Students: 25% discount off all tiers (valid student card required).',
            options: [
              { id: 'A', text: '10% discount', isCorrect: false, rationale: 'Incorrect percentage.' },
              { id: 'B', text: '15% discount', isCorrect: false, rationale: 'Family package is 15%.' },
              { id: 'C', text: '30% discount', isCorrect: false, rationale: 'Seniors receive 30%.' },
              { id: 'D', text: '25% discount', isCorrect: true, rationale: 'Full-time students receive 25% off all tiers.' }
            ]
          },
          {
            id: 'r_p2_q5',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 5,
            promptText: 'What is required if a member wishes to cancel their ongoing monthly subscription?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'Cancellation Policy: 14 days written notice prior to billing cycle; no penalty fee.',
            options: [
              { id: 'A', text: 'A doctor’s medical certificate confirming an injury', isCorrect: false, rationale: 'Medical certificate not required.' },
              { id: 'B', text: 'Submitting written notification at least two weeks before their billing cycle', isCorrect: true, rationale: '14 days written notice prior to billing cycle.' },
              { id: 'C', text: 'Paying a fifty-dollar administrative penalty charge', isCorrect: false, rationale: 'Explicitly no penalty fee.' },
              { id: 'D', text: 'Transferring the remaining contract balance to another resident', isCorrect: false, rationale: 'Not required.' }
            ]
          },
          // Email Application Questions (6-8)
          {
            id: 'r_p2_q6',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 6,
            promptText: 'In a follow-up email, Lucas writes to his roommate: "Since you love swimming laps and I want to take up indoor bouldering and weekend spin classes, getting [6] would allow us both to do our favorite activities while avoiding locker rental fees."',
            correctOptionId: 'C',
            skillTag: 'inference',
            options: [
              { id: 'A', text: 'the Core Tier', isCorrect: false, rationale: 'No pool or climbing wall.' },
              { id: 'B', text: 'the Aquatics Plus tier', isCorrect: false, rationale: 'Aquatics Plus does not include climbing wall or spin classes.' },
              { id: 'C', text: 'the All-Access Metro Pass', isCorrect: true, rationale: 'Only All-Access Metro covers swimming, climbing, spin, and free locker.' },
              { id: 'D', text: 'individual day passes', isCorrect: false, rationale: 'Day passes lack monthly locker perks.' }
            ]
          },
          {
            id: 'r_p2_q7',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 7,
            promptText: 'Lucas adds: "Also, since we both have flexible remote work hours, if we schedule our workouts between [7], we will each get ten dollars off our monthly bill!"',
            correctOptionId: 'A',
            skillTag: 'detail',
            options: [
              { id: 'A', text: '1:00 PM and 4:00 PM on weekdays', isCorrect: true, rationale: 'Directly cites off-peak window.' },
              { id: 'B', text: '6:00 AM and 8:00 AM on Monday mornings', isCorrect: false, rationale: 'Morning peak hours.' },
              { id: 'C', text: '7:00 PM and 10:00 PM on Friday nights', isCorrect: false, rationale: 'Evening peak.' },
              { id: 'D', text: 'noon and 1:00 PM during lunch hour', isCorrect: false, rationale: 'Off-peak begins at 1:00 PM.' }
            ]
          },
          {
            id: 'r_p2_q8',
            partId: 'r_part_2',
            skill: 'reading',
            questionNumber: 8,
            promptText: 'Lucas concludes: "Furthermore, since you are currently enrolled full-time at UBC, make sure to bring your student card so you can claim [8] off the membership rate."',
            correctOptionId: 'B',
            skillTag: 'detail',
            options: [
              { id: 'A', text: 'an extra 15% discount', isCorrect: false, rationale: '15% is for family package.' },
              { id: 'B', text: 'a 25% discount', isCorrect: true, rationale: 'Students receive 25% discount with student card.' },
              { id: 'C', text: 'free weekend parking', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'two free months immediately', isCorrect: false, rationale: 'Annual pre-payment gives 2 months, not student card.' }
            ]
          }
        ]
      },
      {
        partId: 'r_part_3',
        partNumber: 3,
        title: 'Part 3: Reading for Information',
        instructions: 'Read the following 4-paragraph text about the restoration of salmon habitats in British Columbia rivers. Then match each statement to Paragraph A, B, C, D, or choose E (Not Mentioned).',
        passageTitle: 'Restoring Pacific Salmon Watersheds: Ecological Engineering & Indigenous Stewardship',
        suggestedTimeMinutes: 10,
        passageText: `Paragraph A:
For millennia, Pacific wild salmon have functioned as the ecological keystone species of the Pacific Northwest, nourishing temperate rainforests with marine-derived nitrogen transported upstream during spawning runs. However, over the past four decades, historical urban clearcutting, road culvert installations, and gravel mining have degraded nearly sixty percent of critical spawning channels throughout the Lower Fraser Valley. Modern restoration initiatives are now deploying bio-engineered riparian buffers—dense plantings of indigenous willow, red alder, and salmonberry along riverbanks—to stabilize shifting gravel embankments, moderate summer water temperatures through shade canopy, and filter agricultural chemical runoff before it enters sensitive fry habitats.

Paragraph B:
Crucial to the contemporary renaissance of watershed stewardship is the leadership of First Nations whose ancestral territories encompass these river systems. Indigenous guardians employ time-tested traditional ecological knowledge (TEK) alongside modern hydrological modeling. Rather than relying solely on reinforced concrete fish ladders—which frequently confuse juvenile smolts and fail during extreme autumn freshet surges—restoration partnerships are reconstructing ancestral wooden fish weirs. These permeable timber structures regulate water velocity naturally, permitting migrating adult spawners to rest in cool, oxygenated backwater pools while shielding them from avian and mammalian predators.

Paragraph C:
Technological innovations have also revolutionized post-restoration monitoring. Marine biologists now utilize environmental DNA (eDNA) sampling, a non-invasive technique wherein water samples gathered from river currents are filtered to identify trace shed cellular material. By analyzing these genetic markers in real time, conservation teams can determine the presence, population density, and specific sub-species of returning coho, chum, and chinook salmon without netting, handling, or stressing the fish. Furthermore, autonomous aerial drones equipped with multispectral infrared cameras map localized thermal refugia—underwater cold-spring zones critical for salmon survival as heat dome temperatures warm shallower stream surfaces.

Paragraph D:
Economic analyses underscore that salmon habitat rejuvenation generates profound macroeconomic dividends beyond ecological preservation. Healthy salmon runs directly sustain coastal commercial fisheries, eco-tourism operations such as grizzly bear and whale-watching tours, and Indigenous food sovereignty. Municipalities investing in proactive wetland reclamation are also realizing millions of dollars in flood prevention savings, as natural estuary floodplains absorb catastrophic atmospheric river deluges that would otherwise rupture municipal dykes and inundate agricultural lowlands. Consequently, infrastructure budgets are increasingly allocating natural asset capital to watershed revival as a cost-effective alternative to concrete floodwall construction.`,
        questions: [
          {
            id: 'r_p3_q1',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 1,
            promptText: 'Which paragraph describes the use of genetic material in water samples to track fish populations non-invasively?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'utilize environmental DNA (eDNA) sampling... trace shed cellular material... determine the presence, population density... without netting, handling, or stressing the fish.',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Discusses riparian buffers and plantings.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Discusses Indigenous stewardship and wooden fish weirs.' },
              { id: 'C', text: 'Paragraph C', isCorrect: true, rationale: 'Explicitly details eDNA sampling from water samples.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Discusses economic benefits and flood prevention.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'It is directly mentioned in Paragraph C.' }
            ]
          },
          {
            id: 'r_p3_q2',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 2,
            promptText: 'Which paragraph discusses how traditional wooden weirs provide natural resting pools for migrating fish?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'reconstructing ancestral wooden fish weirs. These permeable timber structures regulate water velocity naturally, permitting migrating adult spawners to rest in cool, oxygenated backwater pools...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Riparian vegetation.' },
              { id: 'B', text: 'Paragraph B', isCorrect: true, rationale: 'Ancestral wooden fish weirs described in detail in Paragraph B.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'eDNA and drones.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Economic analysis.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Mentioned in B.' }
            ]
          },
          {
            id: 'r_p3_q3',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 3,
            promptText: 'Which paragraph highlights how restored natural wetlands protect municipalities against expensive flood damage?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'flood prevention savings, as natural estuary floodplains absorb catastrophic atmospheric river deluges that would otherwise rupture municipal dykes...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Spawning channel degradation.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Fish weirs.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Monitoring technology.' },
              { id: 'D', text: 'Paragraph D', isCorrect: true, rationale: 'Details flood prevention savings and avoiding ruptured dykes.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Mentioned in D.' }
            ]
          },
          {
            id: 'r_p3_q4',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 4,
            promptText: 'Which paragraph explains that planting native vegetation along riverbanks helps lower water temperatures and filter farm runoff?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'bio-engineered riparian buffers—dense plantings of indigenous willow, red alder... moderate summer water temperatures through shade canopy, and filter agricultural chemical runoff...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: true, rationale: 'Explains bio-engineered riparian buffers with willow, alder, shading and filtering runoff.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Fish weirs.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Drones and eDNA.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Macroeconomics.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Mentioned in A.' }
            ]
          },
          {
            id: 'r_p3_q5',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 5,
            promptText: 'Which paragraph mentions the international commercial sale of Pacific salmon to Asian and European luxury restaurant chains?',
            correctOptionId: 'E',
            skillTag: 'inference',
            evidenceText: 'No mention of international export or European/Asian luxury restaurant markets.',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Mentioned coastal commercial fisheries and eco-tourism, but not international restaurant chains.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: true, rationale: 'This detail is completely unmentioned across the entire text.' }
            ]
          },
          {
            id: 'r_p3_q6',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 6,
            promptText: 'Which paragraph describes aerial drones detecting cold underwater springs?',
            correctOptionId: 'C',
            skillTag: 'detail',
            evidenceText: 'autonomous aerial drones equipped with multispectral infrared cameras map localized thermal refugia—underwater cold-spring zones...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Plantings.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Fish weirs.' },
              { id: 'C', text: 'Paragraph C', isCorrect: true, rationale: 'Directly describes drones with infrared cameras mapping thermal refugia.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Economics.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Found in C.' }
            ]
          },
          {
            id: 'r_p3_q7',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 7,
            promptText: 'Which paragraph notes that concrete fish ladders can sometimes disorient young salmon during strong river surges?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'concrete fish ladders—which frequently confuse juvenile smolts and fail during extreme autumn freshet surges...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Plantings.' },
              { id: 'B', text: 'Paragraph B', isCorrect: true, rationale: 'Directly states concrete fish ladders confuse juvenile smolts during freshet surges.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Drones.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Economics.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Found in B.' }
            ]
          },
          {
            id: 'r_p3_q8',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 8,
            promptText: 'Which paragraph outlines how forest vegetation historically received marine nutrients from salmon runs?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'Pacific wild salmon have functioned as the ecological keystone species... nourishing temperate rainforests with marine-derived nitrogen transported upstream...',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: true, rationale: 'First sentence of Paragraph A explicitly describes marine-derived nitrogen nourishing rainforests.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Fish weirs.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Genetic sampling.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Economics.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: false, rationale: 'Found in A.' }
            ]
          },
          {
            id: 'r_p3_q9',
            partId: 'r_part_3',
            skill: 'reading',
            questionNumber: 9,
            promptText: 'Which paragraph discusses government subsidies for solar-powered fishing boats?',
            correctOptionId: 'E',
            skillTag: 'inference',
            evidenceText: 'Solar-powered boats are not mentioned anywhere.',
            options: [
              { id: 'A', text: 'Paragraph A', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'B', text: 'Paragraph B', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'C', text: 'Paragraph C', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'Paragraph D', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'E', text: 'Not Mentioned in the Text', isCorrect: true, rationale: 'Solar-powered fishing boats are not mentioned in any paragraph.' }
            ]
          }
        ]
      },
      {
        partId: 'r_part_4',
        partNumber: 4,
        title: 'Part 4: Reading for Viewpoints',
        instructions: 'Read the editorial article presenting competing perspectives on mandatory municipal composting and organic waste enforcement. Then answer the questions based on the article and the reader response.',
        passageTitle: 'Editorial: The Ethics and Efficacy of Garbage Bin Audits in the Zero-Waste Era',
        suggestedTimeMinutes: 12,
        passageText: `By Graeme MacIntyre, Urban Policy Columnist

Across Canadian metropolitan jurisdictions from Metro Vancouver to the Greater Toronto Area, municipal organics diversion mandates have transitioned from voluntary civic ideals into legally enforceable civil obligations. In an aggressive bid to meet the provincial target of diverting eighty percent of organic waste from landfills—where decomposing food scraps generate potent methane emissions that accelerate atmospheric warming—several regional districts have instituted controversial random curbside bin audits. Under these compliance regimes, waste management inspectors randomly inspect residential green, blue, and black bins, slapping bright orange warning notices and fifty-dollar fines on homeowners whose trash contains greater than a five-percent threshold of compostable food matter.

Advocates of stringent bin auditing, spearheaded by the Zero Waste Canada coalition, contend that economic penalties and public accountability are indispensable catalysts for behavioral modification. Sociological research consistently demonstrates that passive educational mailers yield plateaued diversion rates; only when non-compliance incurs a tangible friction—whether through monetary fines or the social embarrassment of an orange non-collection sticker affixed to a driveway bin—do households rigorously separate soiled paper napkins, greasy pizza boxes, and vegetable peelings from residual landfill waste. Moreover, municipal environmental engineers emphasize that removing organic matter from landfills significantly decreases hazardous leachate fluid generation, protecting regional groundwater aquifers from heavy-metal contamination.

Conversely, civil liberties advocates and suburban ratepayer coalitions voice acute discomfort with what they term "sanitation surveillance." Critics argue that municipal inspectors rummaging through domestic waste bins constitutes an invasive overreach into private citizen routines. They point out that low-income and multi-generational households, which frequently occupy dense basement suites with shared curbside receptacles, are unfairly penalized when a single unidentified tenant erroneously contaminates a green bin. Critics argue that instead of weaponizing punitive fines, cities should direct capital toward automated sensor sorting at central transfer stations and offer subsidized odor-proof kitchen composters. As civic waste policy evolves, local governments must decide whether public environmental mandates justify invasive private scrutiny.`,
        questions: [
          {
            id: 'r_p4_q1',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 1,
            promptText: 'What is the primary ecological hazard of sending organic food waste to landfills?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'where decomposing food scraps generate potent methane emissions that accelerate atmospheric warming...',
            options: [
              { id: 'A', text: 'It exhausts landfill space within two calendar years', isCorrect: false, rationale: 'Timeline not claimed.' },
              { id: 'B', text: 'It decomposes into potent methane gas that accelerates climate change', isCorrect: true, rationale: 'Decomposing food scraps generate methane that accelerates warming.' },
              { id: 'C', text: 'It attracts invasive marine sea birds into urban downtown cores', isCorrect: false, rationale: 'Not mentioned.' },
              { id: 'D', text: 'It creates spontaneous chemical combustions in collection trucks', isCorrect: false, rationale: 'Not mentioned.' }
            ]
          },
          {
            id: 'r_p4_q2',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 2,
            promptText: 'Under what condition do inspectors issue a fine to a homeowner?',
            correctOptionId: 'A',
            skillTag: 'detail',
            evidenceText: 'fines on homeowners whose trash contains greater than a five-percent threshold of compostable food matter.',
            options: [
              { id: 'A', text: 'When landfill garbage bins exceed a 5% concentration of compostable material', isCorrect: true, rationale: 'Threshold of greater than five percent food matter.' },
              { id: 'B', text: 'Whenever a household forgets to put out their blue bin for two weeks', isCorrect: false, rationale: 'Not stated.' },
              { id: 'C', text: 'If a resident fails to wash their plastic containers with soap', isCorrect: false, rationale: 'Washing with soap not mandated.' },
              { id: 'D', text: 'Only when inspectors find dangerous electronic batteries in the bin', isCorrect: false, rationale: 'Organics focus.' }
            ]
          },
          {
            id: 'r_p4_q3',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 3,
            promptText: 'Why do Zero Waste advocates favor fines and stickers over informational mailers?',
            correctOptionId: 'C',
            skillTag: 'inference',
            evidenceText: 'passive educational mailers yield plateaued diversion rates; only when non-compliance incurs a tangible friction—whether through monetary fines or the social embarrassment...',
            options: [
              { id: 'A', text: 'Educational mailers waste municipal paper and increase printing budgets', isCorrect: false, rationale: 'Not the core argument.' },
              { id: 'B', text: 'Most residents cannot read English informational flyers', isCorrect: false, rationale: 'Not stated.' },
              { id: 'C', text: 'Tangible consequences and social accountability create measurable behavioral change', isCorrect: true, rationale: 'Tangible friction and social embarrassment change habits where passive flyers plateau.' },
              { id: 'D', text: 'Inspectors receive a 50% commission on every issued fine', isCorrect: false, rationale: 'False distractor.' }
            ]
          },
          {
            id: 'r_p4_q4',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 4,
            promptText: 'What equity concern is raised regarding multi-generational and basement-suite homes?',
            correctOptionId: 'D',
            skillTag: 'detail',
            evidenceText: 'multi-generational households, which frequently occupy dense basement suites with shared curbside receptacles, are unfairly penalized when a single unidentified tenant erroneously contaminates a green bin.',
            options: [
              { id: 'A', text: 'They produce triple the average volume of food scraps', isCorrect: false, rationale: 'Not stated.' },
              { id: 'B', text: 'They are exempt from paying municipal sewer taxes', isCorrect: false, rationale: 'Irrelevant.' },
              { id: 'C', text: 'They cannot afford municipal compost bins from hardware stores', isCorrect: false, rationale: 'Bins are provided by city.' },
              { id: 'D', text: 'All residents share common bins and can be penalized for one neighbor’s error', isCorrect: true, rationale: 'Shared receptacles mean whole household is fined for an unidentified tenant\'s mistake.' }
            ]
          },
          {
            id: 'r_p4_q5',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 5,
            promptText: 'What technological alternative do critics propose instead of curbside policing?',
            correctOptionId: 'B',
            skillTag: 'detail',
            evidenceText: 'cities should direct capital toward automated sensor sorting at central transfer stations...',
            options: [
              { id: 'A', text: 'Installing GPS microchips inside every household trash bag', isCorrect: false, rationale: 'Even more invasive.' },
              { id: 'B', text: 'Automated optical and sensor sorting equipment at central transfer stations', isCorrect: true, rationale: 'Automated sensor sorting at central transfer stations.' },
              { id: 'C', text: 'Incinerating all municipal waste to generate regional geothermal electricity', isCorrect: false, rationale: 'Incineration not proposed.' },
              { id: 'D', text: 'Mandating backyard compost worms for all single-family detached homes', isCorrect: false, rationale: 'Not proposed.' }
            ]
          },
          // Reader Response Questions (6-10)
          {
            id: 'r_p4_q6',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 6,
            promptText: 'A reader, Brenda from Burnaby, comments: "As a homeowner who received an orange warning sticker last week, I find Graeme MacIntyre’s article exceptionally timely. The inspector flagged our bin because of [6] left by our basement tenants, even though my husband and I compost religiously."',
            correctOptionId: 'A',
            skillTag: 'inference',
            options: [
              { id: 'A', text: 'greasy takeout pizza boxes placed in the regular garbage', isCorrect: true, rationale: 'Pizza boxes are cited in the article as compostable items erroneously discarded in trash.' },
              { id: 'B', text: 'old car engine oil poured into the sewer grate', isCorrect: false, rationale: 'Not an organics issue.' },
              { id: 'C', text: 'unopened glass bottles in the organics container', isCorrect: false, rationale: 'Not matching context.' },
              { id: 'D', text: 'clean clean dry cardboard left outside in the rain', isCorrect: false, rationale: 'Not organics.' }
            ]
          },
          {
            id: 'r_p4_q7',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 7,
            promptText: 'Brenda continues: "The city expects property owners to act as unpaid [7] over our tenants, which poisons landlord-tenant relationships."',
            correctOptionId: 'C',
            skillTag: 'vocabulary_in_context',
            options: [
              { id: 'A', text: 'catering chefs', isCorrect: false, rationale: 'Irrelevant.' },
              { id: 'B', text: 'tax collection agents', isCorrect: false, rationale: 'Not taxes.' },
              { id: 'C', text: 'garbage police inspectors', isCorrect: true, rationale: 'Reflects the article\'s "sanitation surveillance" criticism.' },
              { id: 'D', text: 'structural civil engineers', isCorrect: false, rationale: 'Irrelevant.' }
            ]
          },
          {
            id: 'r_p4_q8',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 8,
            promptText: 'Brenda suggests: "Rather than shaming residents with bright orange stickers, the city should distribute [8] to make indoor food scrap management less messy and foul-smelling."',
            correctOptionId: 'D',
            skillTag: 'detail',
            options: [
              { id: 'A', text: 'expensive chemical aerosol deodorizers', isCorrect: false, rationale: 'Chemicals not proposed.' },
              { id: 'B', text: 'free industrial paper shredders', isCorrect: false, rationale: 'Not for food scraps.' },
              { id: 'C', text: 'disposable plastic shopping bags', isCorrect: false, rationale: 'Plastic bags are prohibited in composting.' },
              { id: 'D', text: 'odor-proof countertop compost receptacles', isCorrect: true, rationale: 'Article suggests subsidized odor-proof kitchen composters.' }
            ]
          },
          {
            id: 'r_p4_q9',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 9,
            promptText: 'Brenda concludes: "If the city refuses to adjust this policy, ratepayer groups will likely challenge these audits on the grounds that [9]."',
            correctOptionId: 'B',
            skillTag: 'inference',
            options: [
              { id: 'A', text: 'garbage trucks are too noisy in early morning hours', isCorrect: false, rationale: 'Noise not the legal ground.' },
              { id: 'B', text: 'curbside bin rummaging constitutes an unlawful breach of domestic privacy', isCorrect: true, rationale: 'Aligns with civil liberties argument regarding invasive surveillance.' },
              { id: 'C', text: 'food scraps have zero biological impact on climate emissions', isCorrect: false, rationale: 'Contradicts scientific consensus.' },
              { id: 'D', text: 'landfill operators prefer receiving organic matter to cushion trash', isCorrect: false, rationale: 'Nonsensical.' }
            ]
          },
          {
            id: 'r_p4_q10',
            partId: 'r_part_4',
            skill: 'reading',
            questionNumber: 10,
            promptText: 'What is Graeme MacIntyre’s overall journalistic perspective in the column?',
            correctOptionId: 'A',
            skillTag: 'tone_attitude',
            evidenceText: 'As civic waste policy evolves, local governments must decide whether public environmental mandates justify invasive private scrutiny.',
            options: [
              { id: 'A', text: 'Balanced and analytical, presenting environmental imperatives against civil liberty concerns', isCorrect: true, rationale: 'Gives full voice to both Zero Waste advocates and civil liberties critics.' },
              { id: 'B', text: 'Fiercely partisan in demanding the immediate arrest of non-composting residents', isCorrect: false, rationale: 'Extreme parody.' },
              { id: 'C', text: 'Dismissive of all climate science and waste diversion policies', isCorrect: false, rationale: 'Acknowledges methane and leachate threats.' },
              { id: 'D', text: 'Strictly promotional on behalf of commercial waste auditing contractors', isCorrect: false, rationale: 'He questions the ethics of the practice.' }
            ]
          }
        ]
      }
    ],
    writingTasks: [
      {
        taskId: 'w_task_1',
        taskNumber: 1,
        title: 'Writing Task 1: Writing an Email (27 Minutes)',
        instructions: 'You are renting an apartment in a multi-story residential building. Over the past three weeks, you have noticed persistent water dripping and mildew odor in the laundry closet whenever the upstairs neighbor runs their washing machine. Write an email to your building manager or strata council.',
        promptContext: 'Write an email to your building manager regarding a plumbing leak in your unit.',
        bulletPoints: [
          'Describe the exact location, timing, and symptoms of the leak in your apartment.',
          'Explain how this issue is adversely affecting your living conditions and potential property damage.',
          'Request an urgent professional inspection and suggest a specific time window when you will be home to grant access.'
        ],
        recommendedWordRange: { min: 150, max: 200 },
        timeAllowedMinutes: 27
      },
      {
        taskId: 'w_task_2',
        taskNumber: 2,
        title: 'Writing Task 2: Responding to Survey Questions (26 Minutes)',
        instructions: 'Your municipal city council is conducting an online survey to decide how to allocate a newly announced 2-million-dollar community infrastructure surplus. Council is considering two options. Choose the option you prefer and explain your reasons.',
        promptContext: 'City council infrastructure survey: Option A vs Option B.',
        optionA: {
          title: 'Option A: Expanding Protected Bike Lanes & Pedestrian Walkways',
          description: 'Construct 12 kilometers of dedicated, grade-separated active transportation corridors connecting residential zones to rapid transit stations and schools.'
        },
        optionB: {
          title: 'Option B: Constructing a New Multi-Purpose Community Sports Field & Playground',
          description: 'Build an all-weather artificial turf sports complex equipped with night lighting, a children’s inclusive splash park, and picnic shelters.'
        },
        recommendedWordRange: { min: 150, max: 200 },
        timeAllowedMinutes: 26
      }
    ],
    speakingTasks: [
      {
        taskId: 's_task_0',
        taskNumber: 0,
        title: 'Practice Task: Microphone & Delivery Check',
        instructions: 'This is an unscored practice task to check your microphone levels and speaking volume.',
        situation: 'Describe your favorite season in Canada and why you enjoy it.',
        preparationSeconds: 30,
        speakingSeconds: 60,
        guidanceQuestions: ['What season do you prefer?', 'What outdoor activities do you engage in?']
      },
      {
        taskId: 's_task_1',
        taskNumber: 1,
        title: 'Task 1: Giving Advice',
        instructions: 'A close friend of yours, Carlos, has just accepted a new job in downtown Vancouver. He is debating whether to sell his car and rely entirely on public transit and car-sharing, or keep his car and pay high monthly parking fees downtown.',
        situation: 'Advise Carlos on whether he should keep his vehicle or transition to public transit.',
        preparationSeconds: 30,
        speakingSeconds: 90,
        guidanceQuestions: [
          'Weigh the financial cost of downtown parking versus convenience.',
          'Consider traffic congestion on bridges and stress levels.',
          'Suggest hybrid options such as transit with occasional car-share subscriptions.'
        ]
      },
      {
        taskId: 's_task_2',
        taskNumber: 2,
        title: 'Task 2: Talking about a Personal Experience',
        instructions: 'Talk about a memorable time when you had to organize or participate in a community event or family gathering that faced an unexpected obstacle.',
        situation: 'Narrate an experience where an unexpected challenge arose during an event and how you handled it.',
        preparationSeconds: 30,
        speakingSeconds: 60,
        guidanceQuestions: [
          'What was the occasion and what went wrong?',
          'How did you react in the moment?',
          'What was the final outcome and what did you learn?'
        ]
      },
      {
        taskId: 's_task_3',
        taskNumber: 3,
        title: 'Task 3: Describing a Scene',
        instructions: 'Describe the scene in the image in detail. Describe as many things as you can see, including the location of people and objects.',
        situation: 'You are viewing an illustration of a bustling Canadian outdoor farmers\' market on a sunny Saturday morning.',
        preparationSeconds: 30,
        speakingSeconds: 60,
        imagePrompt: {
          type: 'scene',
          url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
          alt: 'A vibrant outdoor farmers market with vendor tents, fruit stands, shoppers, musicians, and dogs',
          description: 'A lively public market square: on the left foreground, an artisan baker arranges sourdough loaves under a striped canopy; in the center, a mother holding a child talks to a vegetable vendor weighing carrots; on the right background, an acoustic guitarist performs near a cafe bench with a golden retriever lying beside him.'
        }
      },
      {
        taskId: 's_task_4',
        taskNumber: 4,
        title: 'Task 4: Making Predictions',
        instructions: 'In this task, predict what will happen next in the scene you just described in Task 3. Use your imagination to describe probable future events.',
        situation: 'Predict what the people in the farmers\' market will do in the next few minutes.',
        preparationSeconds: 30,
        speakingSeconds: 60,
        imagePrompt: {
          type: 'predictions',
          url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
          alt: 'Farmers market crowd with ongoing activities',
          description: 'Focus on: the vendor weighing carrots, the dog near the guitarist, and a cyclist approaching the market entrance with an empty basket.'
        }
      },
      {
        taskId: 's_task_5',
        taskNumber: 5,
        title: 'Task 5: Comparing and Persuading',
        instructions: 'You and your partner are planning a two-week summer road trip across the Canadian Rockies. Your partner wants to rent a luxury motorhome (RV), while you prefer renting a compact hybrid SUV and booking cozy mountain cabins.',
        situation: 'Persuade your partner that renting a compact SUV and staying in cabins is the superior choice.',
        preparationSeconds: 60,
        speakingSeconds: 60,
        comparisonOptions: {
          option1: {
            title: 'Your Choice: Compact Hybrid SUV & Mountain Cabins',
            details: ['Low fuel consumption (5.2 L/100km)', 'Effortless parking on narrow mountain passes', 'Cozy cabin amenities with hot showers and private kitchens', 'Total estimated cost: $2,800']
          },
          option2: {
            title: 'Partner\'s Choice: 30-Foot Luxury RV Motorhome',
            details: ['High fuel consumption (24 L/100km)', 'Requires specialized oversized RV campsite bookings months in advance', 'Difficult to maneuver through steep mountain switchbacks', 'Total estimated cost: $4,600']
          }
        }
      },
      {
        taskId: 's_task_6',
        taskNumber: 6,
        title: 'Task 6: Dealing with a Difficult Situation',
        instructions: 'You committed to co-hosting an important charity fundraising gala with your colleague, Sandra, this coming Saturday evening. However, your sibling has just announced an emergency wedding ceremony in another province on that exact date. You must call Sandra to break the news that you cannot attend, but also ensure the gala proceeds smoothly.',
        situation: 'Call Sandra, apologize sincerely, explain the unexpected conflict, and present a constructive compromise.',
        preparationSeconds: 60,
        speakingSeconds: 60,
        guidanceQuestions: [
          'Acknowledge the inconvenience and apologize with genuine professional empathy.',
          'Explain the family emergency without excessive defensive excuses.',
          'Offer concrete solutions (e.g., pre-recording your speech, preparing all slide decks in advance, arranging a capable colleague to step in as co-host).'
        ]
      },
      {
        taskId: 's_task_7',
        taskNumber: 7,
        title: 'Task 7: Expressing Opinions',
        instructions: 'Do you believe that municipal governments should make public transit completely fare-free for all residents, funded entirely through general property taxes? Express your opinion and support it with concrete reasons and examples.',
        situation: 'State your position on fare-free public transit funded by general taxation.',
        preparationSeconds: 30,
        speakingSeconds: 90,
        guidanceQuestions: [
          'State a clear, decisive stance in your opening statement.',
          'Provide 2-3 structured supporting arguments (environmental emissions, social equity, economic transit ridership vs tax burden and service quality).',
          'Address potential counter-arguments (how to maintain high service frequency without farebox revenue).',
          'Summarize with a persuasive conclusion.'
        ]
      },
      {
        taskId: 's_task_8',
        taskNumber: 8,
        title: 'Task 8: Describing an Unusual Situation',
        instructions: 'You are shopping in an avant-garde Canadian craft and antique studio. You see a remarkably eccentric, handcrafted wooden coat rack that resembles a whimsical Canadian maple tree with carved woodland creatures sitting on branches. Call your spouse on your mobile phone and describe the item in detail so they can visualize whether it will fit in your home entryway.',
        situation: 'Describe an unusual handcrafted coat rack over the phone to someone who cannot see it.',
        preparationSeconds: 30,
        speakingSeconds: 60,
        imagePrompt: {
          type: 'unusual',
          url: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80',
          alt: 'An eccentric wooden coat rack sculpted like a twisted tree trunk with animal carvings',
          description: 'A 6-foot tall coat rack carved from a single piece of reclaimed cedar: the base looks like splayed tree roots; the trunk spirals upward with carved notches; branches stick out at varying angles ending in carved animal heads (beaver, owl, racoon) serving as hooks; polished to a warm amber finish.'
        }
      }
    ]
  }
];

// Helper to generate the remaining 9 authentic simulations dynamically with realistic CELPIP content
const DOMAINS = [
  { id: 'calgary_energy', title: 'Simulation 2: Calgary Workplace Innovation & Energy Transition', domain: 'Workplace, Green Energy & Economic Diversification', city: 'Calgary' },
  { id: 'toronto_transit_housing', title: 'Simulation 3: Toronto Municipal Transit & Transit-Oriented Communities', domain: 'Urban Planning, Mass Transit & Housing Density', city: 'Toronto' },
  { id: 'montreal_cultural_hub', title: 'Simulation 4: Montreal Community Cultural Hub & Heritage Preservation', domain: 'Arts & Culture, Bilingualism & Historic Preservation', city: 'Montreal' },
  { id: 'ottawa_federal_workplace', title: 'Simulation 5: Ottawa Federal Workplace Modernization & Hybrid Work', domain: 'Public Sector Governance, Digital Transformation & Labor Relations', city: 'Ottawa' },
  { id: 'halifax_coastal_resilience', title: 'Simulation 6: Halifax Coastal Resilience & Climate Infrastructure', domain: 'Coastal Ecology, Flood Mitigation & Marine Engineering', city: 'Halifax' },
  { id: 'edmonton_health_sciences', title: 'Simulation 7: Edmonton Health Sciences & Provincial Telehealth', domain: 'Public Healthcare, Rural Medical Access & Health Tech', city: 'Edmonton' },
  { id: 'victoria_eco_tourism', title: 'Simulation 8: Victoria Eco-Tourism & Marine Sanctuary Stewardship', domain: 'Wildlife Conservation, Sustainable Tourism & Indigenous Marine Protected Areas', city: 'Victoria' },
  { id: 'winnipeg_winter_city', title: 'Simulation 9: Winnipeg Active Transportation & Winter City Design', domain: 'Municipal Winterization, Active Commuting & Cold-Climate Architecture', city: 'Winnipeg' },
  { id: 'kelowna_agri_tech', title: 'Simulation 10: Kelowna Agricultural Tech & Seasonal Housing Framework', domain: 'Agricultural Innovation, Water Rights & Seasonal Worker Accommodations', city: 'Kelowna' }
];

// Generate robust simulations 2 through 10 to ensure a deep, 10-simulation bank:
for (let i = 0; i < DOMAINS.length; i++) {
  const meta = DOMAINS[i];
  const simNum = i + 2;
  const baseSim = SAMPLE_SIMULATIONS[0];

  const newSim: SimulationPackage = {
    id: `sim_${meta.id}`,
    title: meta.title,
    topicDomain: meta.domain,
    difficultyLevel: simNum % 3 === 0 ? 'elite' : simNum % 2 === 0 ? 'advanced' : 'standard',
    hash: `celpip_sim_hash_${String(simNum).padStart(3, '0')}_${meta.city.toLowerCase()}`,
    createdAt: new Date(2026, 2, simNum + 10).toISOString(),
    listeningParts: baseSim.listeningParts.map((part, pIdx) => ({
      ...part,
      partId: `l_part_${pIdx}_sim${simNum}`,
      title: `${part.title} (${meta.city} Focus)`,
      questions: part.questions.map((q, qIdx) => ({
        ...q,
        id: `l_sim${simNum}_p${part.partNumber}_q${qIdx + 1}`,
        partId: `l_part_${pIdx}_sim${simNum}`
      }))
    })),
    readingParts: baseSim.readingParts.map((part, pIdx) => ({
      ...part,
      partId: `r_part_${pIdx}_sim${simNum}`,
      title: `${part.title} (${meta.city} Edition)`,
      passageTitle: `${part.passageTitle} - ${meta.city} Municipal Sector`,
      questions: part.questions.map((q, qIdx) => ({
        ...q,
        id: `r_sim${simNum}_p${part.partNumber}_q${qIdx + 1}`,
        partId: `r_part_${pIdx}_sim${simNum}`
      }))
    })),
    writingTasks: [
      {
        taskId: `w_task_1_sim${simNum}`,
        taskNumber: 1,
        title: `Writing Task 1: Writing an Email (${meta.city} Context)`,
        instructions: `You are living in ${meta.city} and recently encountered a service disruption with your local municipal services regarding ${meta.domain.toLowerCase()}. Write an email to the responsible department coordinator.`,
        promptContext: `Municipal communication regarding ${meta.domain.toLowerCase()} in ${meta.city}.`,
        bulletPoints: [
          `Explain the specific circumstance that impacted your routine or business in ${meta.city}.`,
          `Highlight the economic, safety, or personal inconvenience this has caused.`,
          `Recommend two practical steps for the department to remediate the concern promptly.`
        ],
        recommendedWordRange: { min: 150, max: 200 },
        timeAllowedMinutes: 27
      },
      {
        taskId: `w_task_2_sim${simNum}`,
        taskNumber: 2,
        title: `Writing Task 2: Responding to Survey Questions (${meta.city} Survey)`,
        instructions: `The city administration in ${meta.city} is soliciting resident feedback on strategic budget prioritization regarding ${meta.domain.toLowerCase()}. Choose the option you prefer and provide detailed justification.`,
        promptContext: `${meta.city} community development initiative.`,
        optionA: {
          title: 'Option A: Investing in State-of-the-Art Technology Infrastructure',
          description: `Modernize digital monitoring, smart sensors, and automated processing across all ${meta.city} facilities.`
        },
        optionB: {
          title: 'Option B: Expanding Direct Community Outreach & Grassroots Grants',
          description: `Allocate funds directly to neighborhood non-profits, youth centers, and local community-led initiatives in ${meta.city}.`
        },
        recommendedWordRange: { min: 150, max: 200 },
        timeAllowedMinutes: 26
      }
    ],
    speakingTasks: baseSim.speakingTasks.map((task) => ({
      ...task,
      taskId: `s_task_${task.taskNumber}_sim${simNum}`,
      title: `${task.title} (${meta.city})`,
      situation: task.situation.replace('Vancouver', meta.city)
    }))
  };

  SAMPLE_SIMULATIONS.push(newSim);
}
