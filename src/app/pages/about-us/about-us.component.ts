import { Component, OnInit } from '@angular/core';
import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    public TeamSliderConfig: any = TeamSlider;
    public TestimonialSliderConfig: any = TestimonialSlider;

    // Testimonial Carousel
    public testimonial = [{
        image: 'assets/images/testimonial/quoc_duong.png',
        name: 'Dương Nguyễn Đức Quốc',
        designation: 'Mentor',
        description: 'Là một trong 2 mentor của đồ án, hỗ trợ công việc cho team, giúp team chọn ra những công nghệ và hướng đi phù hợp với dự án. Bên cạnh đó, anh luôn bám sát dự án, giúp dự án hoàn thành như dự kiến',
    }, {
        image: 'assets/images/testimonial/thach.png',
        name: 'Lê Quang Thạch',
        designation: 'Mentor',
        description: 'Mentor hỗ trợ kỹ thuật cho team, giúp team giải quyết các vấn đề gặp phải và đưa ra các giải pháp phù hợp. Ngoài ra, anh còn là người đôn đốc team hoàn thành dự án đúng hạn.',
    }]

    // Team
    public team = [{
        image: 'assets/images/team/khue.png',
        name: 'Nguyễn Hà Khuê',
        designation: 'Team Leader'
    }, {
        image: 'assets/images/team/quang.png',
        name: 'Võ Đình Minh Quang',
        designation: 'Team Sub-leader'
    }, {
        image: 'assets/images/team/3.jpg',
        name: 'Phan Hữu Lợi',
        designation: 'Team member'
    }, {
        image: 'assets/images/team/4.jpg',
        name: 'Nguyễn Đức Đạt',
        designation: 'Team member'
    }, {
        image: 'assets/images/team/hoang.png',
        name: 'Trần Ngọc Hoàng',
        designation: 'Team member'
    }]

}
