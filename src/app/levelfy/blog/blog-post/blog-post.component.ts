import { Component, Inject, OnInit } from '@angular/core';
import { NavbarPageComponent } from '../../../core/common/navbar-page-component';
import { DOCUMENT } from '@angular/common';
import { Fragment } from '../../../shared/_blog/fragment.model';

@Component({
    selector: 'app-blog-post',
    templateUrl: './blog-post.component.html',
    styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent extends NavbarPageComponent implements OnInit {
    blogTitle: string = 'Nuestro Blog';
    isSidebarHidden: boolean = false;

    fragments: Fragment[] = [];
    blog = {
        header: 'as',
        body: [
            {
                id: 1,
                subtitle: '',
                img: {
                    src: '',
                    description: '',
                    order: 0,
                },
                paragraph: [
                    {
                        id: 1,
                        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit similique distinctio quidem blanditiis architecto ullam a itaque quisquam nihil! Unde ducimus deleniti exercitationem minima, molestiae ab saepe libero. Doloribus, a?',
                        order: 1,
                    },
                    {
                        id: 2,
                        text: 'Magnam amet labore exercitationem maxime consectetur molestias quas quia dicta, praesentium minus illum quis fuga, fugiat velit voluptate sed nostrum ipsam atque.',
                        order: 2,
                    },
                    {
                        id: 3,
                        text: 'Quaerat voluptas natus velit deleniti reprehenderit vero ad eos ab reiciendis. Libero dignissimos temporibus ipsam sint dolores voluptate consequatur debitis tempora doloremque.',
                        order: 4,
                    }
                ],
                list: {
                    items: ['First item', 'Second item', 'Third item'],
                    order: 3
                },
                cite: {
                    text: '',
                    order: 0
                }
            },
            {
                id: 2,
                subtitle: 'Creating Something New',
                img: {
                    src: '',
                    description: '',
                    order: 0,
                },
                paragraph: [
                    {
                        id: 1,
                        text: 'Laborum placeat quas accusantium vitae perferendis dolores possimus tempora, qui consectetur hic ullam autem. Enim, rerum obcaecati numquam quaerat necessitatibus voluptatem? Repellat!',
                        order: 1,
                    },
                    {
                        id: 2,
                        text: 'Quasi, quos quaerat? Sint at odit possimus ullam saepe suscipit officiis nobis eaque, laudantium ut earum tempore repellendus mollitia odio nam! Unde?',
                        order: 2,
                    },
                    {
                        id: 3,
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi explicabo unde perferendis reprehenderit ullam nobis? Laborum amet voluptatem sunt natus? Tempore commodi corporis accusamus laudantium assumenda blanditiis aut nobis culpa.',
                        order: 3,
                    }
                ],
                list: {
                    items: [],
                    order: 0
                },
                cite: {
                    text: '',
                    order: 0
                }
            },
            {
                id: 3,
                subtitle: `It's time to build your new project`,
                img: {
                    src: `https://source.unsplash.com/sv8oOQaUb-o/990x540`,
                    description: 'Photo Credit: Unsplash',
                    order: 4,
                },
                paragraph: [
                    {
                        id: 1,
                        text: 'Facilis enim voluptatibus qui voluptatum nemo non, facere, fugiat deserunt dicta ab sunt in sequi, assumenda nobis ipsam quidem corporis. Nemo, aliquam.',
                        order: 1,
                    },
                    {
                        id: 2,
                        text: 'Illum numquam sapiente debitis similique, a accusantium quisquam recusandae! Nihil quia nulla blanditiis. Nobis numquam iure facilis consequuntur beatae eos adipisci doloremque!',
                        order: 2,
                    },
                    {
                        id: 3,
                        text: 'Voluptate reiciendis nisi tempora laboriosam commodi sequi sapiente natus aut ab, cum aspernatur illo. Nobis laboriosam excepturi iste earum. Error, ab eius?',
                        order: 3,
                    },
                    {
                        id: 4,
                        text: 'Quam, nesciunt iusto, praesentium amet necessitatibus quod porro libero voluptates soluta nostrum quisquam delectus repellendus totam accusamus sint magni dolore atque qui.',
                        order: 5,
                    }
                ],
                list: {
                    items: [],
                    order: 0
                },
                cite: {
                    text: '',
                    order: 0
                }
            },
            {
                id: 4,
                subtitle: 'It\'s time to build your new project',
                img: {
                    src: '',
                    description: '',
                    order: 0,
                },
                paragraph: [
                    {
                        id: 1,
                        text: 'Laborum placeat quas accusantium vitae perferendis dolores possimus tempora, qui consectetur hic ullam autem. Enim, rerum obcaecati numquam quaerat necessitatibus voluptatem? Repellat!',
                        order: 1,
                    },
                    {
                        id: 2,
                        text: 'Quasi, quos quaerat? Sint at odit possimus ullam saepe suscipit officiis nobis eaque, laudantium ut earum tempore repellendus mollitia odio nam! Unde?',
                        order: 2,
                    },
                    {
                        id: 3,
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi explicabo unde perferendis reprehenderit ullam nobis? Laborum amet voluptatem sunt natus? Tempore commodi corporis accusamus laudantium assumenda blanditiis aut nobis culpa.',
                        order: 3,
                    }
                ],
                list: {
                    items: [],
                    order: 0
                },
                cite: {
                    text: '',
                    order: 0
                }
            }
        ]
    };

    author = 'Valerie Luna';
    date = 'Feb 5';
    time = '6 min read';
    photo = 'assets/img/illustrations/profiles/profile-1.png';

    title = 'Boots on the Ground, Inclusive Thought Provoking Ideas';
    description = 'Empower communities and energize engaging ideas; scale and impact do-gooders while disrupting industries. Venture philanthropy benefits corporations and people by moving the needle.';


    constructor(@Inject(DOCUMENT) document: any) {
        super(document);
    }

    ngOnInit(): void {
        this.blog.body.forEach((f: Fragment) => this.fragments.push(f));
        console.log(this.fragments);

        this.putFixedNavbarDark();

        let sidebar = this.document.getElementById('blogSidebar');
        this.isSidebarHidden = !!sidebar.classList.contains('active');
    }

    hideSidebar(): void {
        let sidebar = this.document.getElementById('blogSidebar');
        sidebar.classList.add('active');
        this.isSidebarHidden = true;
    }

    toggleSidebar(): void {
        let sidebar = this.document.getElementById('blogSidebar');
        this.isSidebarHidden = false;
        if (sidebar.classList.contains('active'))
            sidebar.classList.remove('active');
        else sidebar.classList.add('active');
    }
}
