<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserLog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/login", name="pp_login")
     */
    public function pplogin(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        /** @var User $user */
        $user = $this->getUser();
        if ($user) {
            if ($this->security->isGranted('ROLE_PATIENT')) {
                $em = $this->getDoctrine()->getManager();
                $userLog = new UserLog();
                $userLog->setEventname('login');
                $user->setUserLog($userLog);
                $em->persist($userLog);
                $em->flush();
                $em->clear();

                return new RedirectResponse("/patient");
            }
        }

        return $this->render('patient_portal/login.html.twig', [
            'noIndexTag' => false,
            'search_type' => 'PatientPortal',
            'last_username' => $lastUsername,
            'error' => $error
        ]);

    }

    /**
     * @Route("/logout", name="app_logout", methods={"GET"})
     */
    public function logout()
    {
        // controller can be blank: it will never be executed!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}
