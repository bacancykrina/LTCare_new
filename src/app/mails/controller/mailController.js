app.controller('mailCtrl', function($scope,$interval,$state){
    console.log('mailCtrl reporting for duty');
    
    $scope.noAvatarImg = "assets/img/default-user.png";
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.messages = [{
        "from": "John Stark",
        "date": new Date(y, m, d - 1, 19, 0),
        "subject": "Reference Orthopdaic report",
        "email": "dr.stark@amdhospital.com",
        "avatar": "assets/images/avatar-6.jpg",
        "starred": false,
        "sent": false,
        "spam": false,
        "read": false,
        "content": "<p>Why is it that TV, print, and outdoor media still works for the healthcare industry? <br>It’s because everyone has different media preferences,and oftentimes consume both offline <br>and online media before making a decision. In a 2012 Google/Compete Hospital Study, 84% of<br>clients use both online and offline sources for research. Of those clients who used offline media</p>",
        "id": 50223456
    }, {
        "from": "James Patterson",
        "date": new Date(y, m, d - 1, 18, 43),
        "subject": "Position requirements",
        "email": "patterson@example.com",
        "avatar": "assets/images/avatar-9.jpg",
        "starred": true,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Dr. Vassar</p> <p>I am interested in the Coordinator position advertised on XYZ. </p> <p>Sincerely,<br> <br> James</p>",
        "id": 50223457
    }, {
        "from": "Mary Ferguson",
        "date": new Date(y, m, d - 1, 17, 51),
        "subject": "Employer's job requirements",
        "email": "mary@example.com",
        "avatar": "assets/images/avatar-8.jpg",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Dr. Vassar</p> <p>In response to your advertisement in the<em> Milliken Valley Sentinel </em> for Vice President, Operations, please consider the following:</p> <p> <strong>Develop and implement strategic operational plans.</strong> <br> 15+ years aggressive food company production management experience. Planned, implemented, coordinated, and revised all production operations in plant of 250+ employees.</p> <p> <strong>Manage people, resources and processes.</strong> <br> Developed and published weekly processing and packaging schedules to meet annual corporate sales demands of up to $50 million. Met all production requirements and minimized inventory costs.</p> <p> <strong>Coach and develop direct reports.</strong> <br> Designed and presented training programs for corporate, divisional and plant management personnel. Created employee involvement program resulting in $100,000+ savings annually.</p> <p> <strong>Ensure operational service groups meet needs of external and internal customers.</strong> <br> Chaired cross-functional committee of 16 associates that developed and implemented processes, systems and procedures plant-wide. Achieved year end results of 12% increase in production, 6% reduction in direct operational costs and increased customer satisfaction rating from 85% to 93.5%.</p> <p>I welcome the opportunity to visit with you about this position. My resume has been uploaded, per your instructions. I may be reached at the number above. Thanks again for your consideration.</p> <p>Sincerely,<br> <br> Mary Ferguson</p>",
        "id": 50223458
    }, {
        "from": "Jane Fieldstone",
        "date": new Date(y, m, d - 1, 17, 38),
        "subject": "Job Offer",
        "email": "fieldstone@example.com",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Dr. Vassar,</p> <p>As we discussed on the phone, I am very pleased to accept the position of Marketing Manager with Smithfield Pottery. Thank you for the opportunity. I am eager to make a positive contribution to the company and to work with everyone on the Smithfield team.</p> <p>As we discussed, my starting salary will be $38,000 and health and life insurance benefits will be provided after 90 days of employment.</p> <p>I look forward to starting employment on July 1, 20XX. If there is any additional information or paperwork you need prior to then, please let me know.</p> <p>Again, thank you.</p> <p> <br> Jane Fieldstone</p>",
        "id": 50223459
    }, {
        "from": "Steven Thompson",
        "date": new Date(y, m, d - 1, 12, 2),
        "subject": "Personal invitation",
        "email": "thompson@example.com",
        "avatar": "assets/images/avatar-3.jpg",
        "starred": false,
        "sent": false,
        "spam": false,
        "content": "<p>Dear Clarine,</p> <p>Good Day!</p> <p>We would like to invite you to the coming birthday party of our son Francis John Waltz Jr. as he is celebrating his first birthday. The said party will be on November 27, 2010 at Toy Kingdom just along Almond road. All kids are expected to wear their beautiful fancy dress.</p> <p>We will be delighted with your presence in this party together with your family. We will be arranging transportation for all the guests for your convenience in going to the venue of the said party promptly.</p> <p>It is a great honor for us to see you at the party and please do confirm your attendance before the party in the given number so that we will arrange the service accordingly.</p> <p>Best regards,</p> <p>Mr. and Mrs. Thompson</p>",
        "id": 50223460
    }, {
        "from": "Michael A. Faust",
        "date": new Date(y, m, d - 1, 11, 22),
        "subject": "Re: Group Meeting",
        "email": "faust@example.com",
        "starred": true,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Sir</p><p>It was my pleasure to be introduced to you by Dr. Elliot Carson last Tuesday. I am delighted to make your acquaintance. Dr. Carson has highly recommended you as an visiting doctor with integrity and good reputation.</p><p>Hence, it would be my pleasure to extend an invitation to you to join our Hospital.</p><p>Respectfully yours,</p><p>Michael A. Faust</p>",
        "id": 50223461
    },  {
        "from": "Shane Michaels",
        "date": new Date(y, m, d - 2, 20, 32),
        "subject": "Treatment for new client",
        "email": "shane@example.com",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>This letter is with regards to the advertisement given in the yesterdays newspaper &amp; we feel proud to introduce ourselves as M/s ABC advertising agency. We are ready to take up your proposal of doing marketing work for your Hospital. </p><p>Yours sincerely,</p><p>Shane Michaels</p>",
        "id": 50223464
    }, {
        "from": "Kenneth Ross",
        "date": new Date(y, m, d - 2, 19, 59),
        "subject": "Sincere request to keep in touch.",
        "email": "kenneth@example.com",
        "avatar": "assets/images/avatar-5.jpg",
        "starred": false,
        "sent": false,
        "read": true,
        "spam": false,
        "content": "<p>Dear Dr. Vassar,</p><p>I was shocked to see my letter after having just left and  part away from college just a couple of weeks ago. Well it’s my style to bring back together and  hold on to our college group who seems to get separated and  simply go along their own ways. Just giving it a sincere try, who wish to live life just like those college days, to share and  support for every minute crust and  fragments happening in the life.</p><p>So without any compulsion and  without any special invitation this is a one time offer cum request cum order to keep in touch and  also to live forever as best buddies. Hoping to see you at Café da Villa on this Sunday evening to celebrate our new beginning in a grand way.</p><p>Thanking you,</p>",
        "id": 50223465
    }];


    var incomingMessages = [
		{
		    "from": "Nicole Bell",
		    "date": new Date(),
		    "subject": "New client treatment discussion",
		    "email": "nicole@example.com",
		    "avatar": "assets/images/avatar-2.jpg",
		    "starred": false,
		    "sent": false,
		    "read": false,
		    "spam": false,
		    "content": "Hi there! Are you available around 2pm today? I’d like to talk to you about a new client",
		    "id": 50223466
		},
		{
		    "from": "Steven Thompson",
		    "date": new Date(),
		    "subject": "Apology",
		    "email": "thompson@sgvhospital.com",
		    "avatar": "assets/images/avatar-3.jpg",
		    "starred": false,
		    "sent": false,
		    "read": false,
		    "spam": false,
		    "content": "<p>Hi Clarine,</p> <p>I am very sorry for my behavior in the staff meeting this morning.</p> <p>I cut you off in the middle of your presentation, and criticized your performance in front of the staff. This was not only unprofessional, but also simply disrespectful. I let my stress about a personal matter impact my management of the Hospital.</p>",
		    "id": 50223467
		}		
    ];


    $scope.scopeVariable = 1;
    var loadMessage = function () {
        $scope.messages.push(incomingMessages[$scope.scopeVariable - 1]);
        $scope.scopeVariable++;
    };

    //Put in interval, first trigger after 10 seconds
//    var add = $interval(function () {
//        if ($scope.scopeVariable < 4) {
//            loadMessage();
//        }
//    }, 10000);
//
//    $scope.stopAdd = function () {
//        if (angular.isDefined(add)) {
//            $interval.cancel(add);
//            add = undefined;
//        }
//    };
})