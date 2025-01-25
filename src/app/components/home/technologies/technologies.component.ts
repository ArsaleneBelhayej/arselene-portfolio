import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ReplaySubject, Observable } from 'rxjs';
import {
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { UiUtilsView } from 'src/app/views.utils'; // Adjust the path based on your project structure

interface Tool {
  id: string;
  name: string;
  logo: string;
  link: string;
  tab: string;
  color?: string;
}

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;

  _mTriggerAnim?= 'false';
  _mThreshold = 0.2;

  @ViewChild('toolsRef') toolsRef?: ElementRef<HTMLElement>;

  tools: Tool[] = [
    // DevOps Tools
    {
      id: "1001",
      name: "Kubernetes",
      logo: "assets/images/tech/k8s.svg",
      link: "https://kubernetes.io/",
      tab: "devops",

    },
    {
      id: "1002",
      name: "Jenkins",
      logo: "https://www.jenkins.io/images/logos/jenkins/jenkins.svg",
      link: "https://www.jenkins.io/",
      tab: "devops",
    },
    {
      id: "1003",
      name: "Docker",
      logo: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png",
      link: "https://www.docker.com/",
      tab: "devops",
    },
    {
      id: "1004",
      name: "Terraform",
      logo: "assets/images/tech/terraform.svg",
      link: "https://www.terraform.io/",
      tab: "devops",
      color:"#3925aa",
    },
    {
      id: "1005",
      name: "Ansible",
      logo: "assets/images/tech/ansible.svg",
      link: "https://www.ansible.com/",
      tab: "devops",
    },
    {
      id: "1006",
      name: "GitLab CI/CD",
      logo: "assets/images/tech/gitlab.svg",
      link: "https://docs.gitlab.com/ee/ci/",
      tab: "devops",
    },
    {
      id: "4001",
      name: "AWS",
      logo: "assets/images/tech/aws.svg",
      link: "https://aws.amazon.com/",
      tab: "cloud",

    },
    {
      id: "4002",
      name: "Azure",
      logo: "assets/images/tech/azure.svg",
      link: "https://azure.microsoft.com/",
      tab: "cloud",
    },
    {
      id: "4003",
      name: "Google Cloud",
      logo: "assets/images/tech/gcp.svg",
      link: "https://cloud.google.com/",
      tab: "cloud",
    },
    {
      id: "5002",
      name: "Grafana",
      logo: "assets/images/tech/grafana.svg",
      link: "https://grafana.com/",
      tab: "monitoring",
    },
    {
      id: "5001",
      name: "Prometheus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg",
      link: "https://prometheus.io/",
      tab: "monitoring",
      color:"#FF9D23",
    },
    {
      id: "1007",
      name: "Puppet",
      logo: "assets/images/tech/puppet.svg",
      link: "https://puppet.com/",
      tab: "devops",
    },
    {
      "id": "1008",
      "name": "Git",
      "logo": "assets/images/tech/git.svg",
      "link": "https://git-scm.com/",
      "tab": "devops"
},
    {
      id: "1009",
      name: "Helm",
      logo: "https://helm.sh/img/helm.svg",
      link: "https://helm.sh/",
      tab: "devops",
    },
    {
      id: "3003",  // Unique ID for Flutter
      name: "Flutter",
      logo: "assets/images/tech/flutter.svg",  // Flutter's logo URL
      link: "https://flutter.dev/",  // Official Flutter website
      tab: "web",  // You can adjust this tab if you want Flutter in another category
      color:"#42a5f5",
    },
    {
      id: "1010",
      name: "Splunk",
      logo: "assets/images/tech/splunk.svg",
      link: "https://www.splunk.com/",
      tab: "devops",
    },

    // Miscellaneous Tools
    {
      id: "2001",
      name: ".NET",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg",
      link: "https://dotnet.microsoft.com/",
      tab: "misc",
    },
    {
      id: "3001",
      name: "Angular",
      logo: "https://angular.io/assets/images/logos/angular/angular.svg",
      link: "https://angular.io/",
      tab: "web",
      color: "#ff4369",
    },
    {
      id: "2002",
      name: "SonarQube",
      logo: "assets/images/tech/sonarq.svg",
      link: "https://www.sonarqube.org/",
      tab: "misc",
    },

    {
      id: "2003",
      name: "Python",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      link: "https://www.python.org/",
      tab: "misc",
    },
    {
      id: "3002-3",
      name: "React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",  // React SVG logo
      link: "https://reactjs.org/",
      tab: "web"
    },
    {
      id: "3002-4",
      name: "Node.js",
      logo: "assets/images/tech/node.svg",  // Node.js SVG logo
      link: "https://nodejs.org/",
      tab: "web",

    },
    {
      id: "3002-2",
      name: "Express.js",
      logo: "assets/images/tech/express.svg",  // Express.js logo (PNG available, SVG is not official)
      link: "https://expressjs.com/",
      tab: "web",
      color: "#f7df1e",
    },
    {
      id: "3002-1",
      name: "MongoDB",
      logo: "assets/images/tech/mongodb.svg",  // MongoDB SVG logo
      link: "https://www.mongodb.com/",
      tab: "web"
    },

  ];



  constructor(
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private setupAnimation() {
    if (!this.toolsRef) return;

    this.scroll
      .ancestorScrolled(this.toolsRef, 100)
      .pipe(
        takeUntil(this.destroyed$),
        startWith(0),
        map(() => {
          if (this.toolsRef) {
            const visibility = UiUtilsView.getVisibility(
              this.toolsRef,
              this.viewPortRuler
            );
            return visibility;
          }
          return 0;
        }),
        scan<number, boolean>(
          (acc, val) =>
            val >= this._mThreshold || (acc ? val > 0 : false),
          false
        ),
        distinctUntilChanged(),
        takeWhile((trigger) => !trigger || !this.mOnceAnimated, true),
        switchMap((trigger) =>
          new Observable((observer) =>
            this._ngZone.run(() => observer.next(trigger))
          )
        )
      )
      .subscribe((val) => {
        if (this.mOnceAnimated) return;

        if (val) {
          this.mOnceAnimated = true;
          this._mTriggerAnim = 'true';
          this.cdr.detectChanges();
        }
      });
  }
}
