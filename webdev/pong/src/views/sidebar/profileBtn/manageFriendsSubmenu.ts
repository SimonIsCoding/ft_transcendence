import { openMenu, closeAllMenus, toggleMenuVisibility } from "../sidebarUtils";
import { getTotalUser } from "../../../services/sidebarService/friendsSubmenuService";
import { othersUsersCard } from "./friendsSubmenuRender";
import { getUserLogin/*, getUserMail, getUserPic*/ } from "../../../utils/utils";

interface User {
  login: string;
//   password: string;
  mail: string;
  profile_picture: string,
  token: string;
}

//You can encapsulate i in a closure or a class.
export const manageOthersFriendsCard = (() => {
  let i = 0; // variable privée

  async function main() {
    const othersFriendsDiv = document.getElementById("othersFriendsDiv");
    const othersUsersP = document.getElementById("othersUsersP");
    const totalUsers = await getTotalUser();

    if (totalUsers <= 1) {
      othersFriendsDiv?.classList.add("hidden");
      othersUsersP?.classList.add("hidden");
    } else {
      othersFriendsDiv?.classList.remove("hidden");
      othersUsersP?.classList.remove("hidden");
      const max: number = totalUsers - 1 > 2 ? 2 : totalUsers - 1;

      while (i <= max) {
        const randomUser: User = await getRandomOtherUser();
        let name: string = `othersUsers_${randomUser.login}_card`;
        const container = document.getElementById("othersFriendsCard");

        if (container) {
          container.insertAdjacentHTML("beforeend", othersUsersCard.render(name));
          othersUsersCard.init(randomUser);
        }
        i++;
      }
    }
  }

  function reset() {
    i = 0;
  }

  return { main, reset };
})();

export async function getRandomOtherUser(): Promise<User>
{
	const login = await getUserLogin();
	const res = await fetch('/api/auth/randomOtherUser', {
		method: 'GET',
		credentials: 'include'
	})

	const data = await res.json();
	if (login && data.login !== login)
		return data;
	else
		return await getRandomOtherUser();
}












































export async function manageCardInit()
{
	console.log("entered in manageCardInit");
	await manageOthersFriendsCard.main();
}

export function seeFriendsList(submenus:NodeListOf<HTMLElement>, dashboardSubmenu:HTMLElement | null, gameHistorySubmenu:HTMLElement | null, friendsSubmenu: HTMLElement | null,)
{

	const backBtnFriendsSubmenu = document.getElementById("backBtnFriendsSubmenu");
	backBtnFriendsSubmenu?.addEventListener('click', () => {
		closeAllMenus(submenus);
		toggleMenuVisibility('profileSubmenu', submenus);
	});

	dashboardSubmenu?.classList.add('hidden');
	gameHistorySubmenu?.classList.add('hidden');
	friendsSubmenu?.classList.remove('hidden');
	openMenu('largeSubmenu');
	openMenu('friendsSubmenu');
	manageCardInit();
}